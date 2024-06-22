import React from "react";
import CountryItem from "./CountryItem";

interface CountryListProps {
  countries: any[];
  onCountryClick: (country: any) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  onCountryClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {countries.map((country) => (
        <CountryItem
          key={country.cca3}
          country={country}
          onCountryClick={onCountryClick}
        />
      ))}
    </div>
  );
};

export default CountryList;
