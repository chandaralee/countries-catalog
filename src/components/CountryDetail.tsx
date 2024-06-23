import React from "react";
import Modal from "react-modal";
import { ICountry } from "../interfaces/country.interface";

interface CountryDetailsProps {
  country: ICountry | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({
  country,
  isOpen,
  onRequestClose,
}) => {
  if (!country) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Country Details"
      bodyOpenClassName="modal-open"
      htmlOpenClassName="modal-open"
    >
      <div className="p-4">
        <h2 className="text-2xl">{country.officialName}</h2>
        <div className="relative aspect-[3/2] overflow-hidden t sm:w-f md:w-2/5 lg:w-1/3 mx-auto my-6">
          <img
            src={country.flag}
            alt={`Flag of ${country.officialName}`}
            className="absolute inset-0 w-full h-full object-fill text-center"
          />
        </div>
        <p>
          <strong>Official Name:</strong> {country.officialName}
        </p>
        <p>
          <strong>Native Name:</strong> {country.nativeName}
        </p>
        <p>
          <strong>Alternative Names:</strong> {country.altSpelling}
        </p>
        <p>
          <strong>Continent(s):</strong> {country.continent}
        </p>
        <p>
          <strong>Country Code: </strong>
          {country.cca2} / {country.cca3}
        </p>
        <p>
          <strong>Language(s):</strong> {country.languages}
        </p>
        <p>
          <strong>Calling Code(s):</strong> {country.callingCode}
        </p>
        <p>
          <strong>Time Zone(s)</strong> {country.timezones}
        </p>
        <button
          onClick={onRequestClose}
          className="mt-4 bg-gray-300 text-gray-400 ring-1 ring-gray-400 hover:ring-negative hover:bg-negative hover:bg-opacity-30 hover:text-white py-2 px-4"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CountryDetails;
