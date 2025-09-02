import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,cca3"
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedData = (() => {
          if (sortBy === "name") {
            return [...data].sort((a, b) =>
              a.name.common.localeCompare(b.name.common)
            );
          } else if (sortBy === "Population") {
            return [...data].sort((a, b) => b.population - a.population);
          } else if (sortBy === "area") {
            return [...data].sort((a, b) => b.area - a.area);
          }
          return data;
        })();

        setCountries(sortedData);
      });
  }, [sortBy]);

  interface Country {
    name: {
      common: string;
    };
    flags: {
      svg: string;
    };
    population: number;
    area: number;
    region: string;
    cca3: string;
  }

  const filteredCountries = countries
    .filter((country) =>
      selectedRegions.length > 0
        ? selectedRegions.includes(country.region)
        : true
    )
    .filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  return (
    <>
      <div className="back">
        <div className="imgDiv">
          <img className="img" src="/hero-image.jpg" />
          <img className="logo" src="/Logo.svg" />
        </div>
      </div>
      <div className="content">
        <div className="header">
          <h4>Found {filteredCountries.length} countries</h4>
          <input
            className="search"
            type="text"
            placeholder="Search by Nome, Region, Subregion"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table">
          <div className="config">
            <div className="sort">
              <label>Sort By</label>
              <select
                id="idioma"
                name="idioma"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Nome</option>
                <option value="Population">Population</option>
                <option value="area">Area</option>
              </select>
            </div>
            <div className="region">
              <label>Region</label>
              <div className="regionSelec">
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`regionSelec ${
                      selectedRegions.includes(region) ? "active" : ""
                    }`}
                    onClick={() => toggleRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="countries">
            <table>
              <thead>
                <tr>
                  <th>Flag</th>
                  <th>Name</th>
                  <th>Population</th>
                  <th>Area (km³)</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map((country) => (
                  <tr key={country.cca3}>
                    <td>
                      <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        width="30"
                      />
                    </td>
                    <td>{country.name.common}</td>
                    <td>{country.population.toLocaleString()}</td>
                    <td>{country.area?.toLocaleString()}</td>
                    <td>{country.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
