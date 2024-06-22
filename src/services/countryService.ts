import axios from "axios";
import { ICountry } from "../interfaces/country.interface";

class CountryService {
  async getCountryList(): Promise<ICountry[]> {
    try {
      const res = await axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          if (response.status !== 200)
            throw new Error("Network response was not ok");
          const result: ICountry[] = (response.data || []).map(
            (country: any) => ({
              officialName: country.name.official,
              nativeName: country.name?.nativeName
                ? Object.values(country.name.nativeName)
                    .map((name: any) => name?.official)
                    .join(", ")
                : "#N/A",
              flag: country.flags.png,
              altSpelling: country.altSpellings.join(", "),
              cca2: country.cca2,
              cca3: country.cca3,
              callingCode: country.idd?.suffixes
                ? country.idd.suffixes
                    .map((num: any) => `${country.idd.root}${num}`)
                    ?.join(", ")
                : "#N/A",
              continent: country.continents.join(", ") ?? "#N/A",
              timezones: country.timezones.join(", ") ?? "#N/A",
              languages: country?.languages
                ? Object.values(country.languages)?.join(", ")
                : "#N/A",
            })
          );

          return result;
        });
      return res;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  }
}
export const countryService = new CountryService();
