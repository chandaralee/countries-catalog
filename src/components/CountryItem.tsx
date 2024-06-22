import React from "react";
import { ICountry } from "../interfaces/country.interface";

interface CountryItemProps {
  country: ICountry;
  onCountryClick: (country: ICountry) => void;
}

const CountryItem: React.FC<CountryItemProps> = ({
  country,
  onCountryClick,
}) => {
  return (
    <div
      className="border p-4 cursor-pointer items-center"
      onClick={() => onCountryClick(country)}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <img
          src={country.flag}
          alt={`Flag of ${country.officialName}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl mt-2">{country.officialName}</h2>
      <p className="truncate">
        {country.cca2} / {country.cca3} ({country.callingCode})
      </p>
    </div>
  );
};

export default CountryItem;
