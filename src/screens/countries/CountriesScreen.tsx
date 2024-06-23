import React, { useEffect, useState } from "react";
import CountryDetails from "../../components/CountryDetail";
import CountryList from "../../components/CountryList";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import SortSelction from "../../components/SortSelection";
import { ICountry } from "../../interfaces/country.interface";
import { countryService } from "../../services";
import { fuzzySearch } from "../../utils";
import BackdropLoading from "../../components/Loading/BackdropLoading";

type IOrder = "asc" | "desc" | string;

const CountriesScreen: React.FC = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<IOrder>("asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const countriesPerPage = 25;

  useEffect(() => {
    setIsLoading(true);
    const fetchCountriesData = async () => {
      const data = await countryService.getCountryList();
      setCountries(data);
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const searchBy = ["officialName", "nativeName", "altSpelling"];
    let filtered: ICountry[] = fuzzySearch(countries, searchTerm, searchBy);
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.officialName.localeCompare(b.officialName);
      } else {
        return b.officialName.localeCompare(a.officialName);
      }
    });
    setFilteredCountries([...filtered]);
    setIsLoading(false);
    return () => {
      setFilteredCountries([...filtered]);
    };
  }, [countries, searchTerm, sortOrder]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handleCountryClick = (country: any) => {
    setSelectedCountry(country);
    document.body.style.overflow = "hidden"; //make background unscrollable
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleSortChange = (order: IOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Header />

      {isLoading && <BackdropLoading />}

      <div className="container mx-auto p-4">
        <SearchBar
          placeholder="Search by country name..."
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <SortSelction sortOrder={sortOrder} onSortChange={handleSortChange} />

        <CountryList
          countries={currentCountries}
          onCountryClick={handleCountryClick}
        />

        <CountryDetails
          country={selectedCountry}
          isOpen={!!selectedCountry}
          onRequestClose={handleCloseModal}
        />

        <Pagination
          totalCountries={filteredCountries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CountriesScreen;
