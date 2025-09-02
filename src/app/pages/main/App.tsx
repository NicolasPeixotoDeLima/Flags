import "./App.css";

function App() {
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
          <h4>Found 33 countries</h4>
          <input
            className="search"
            type="text"
            placeholder="Search by Nome, Region, Subregion"
          />
        </div>
        <div className="table">
          <div className="config">
            <div className="sort">
              <label>Sort By</label>
              <select id="idioma" name="idioma">
                <option value="name">Nome</option>
                <option value="Population">Population</option>
                <option value="area">Area</option>
              </select>
            </div>
            <div className="region">
              <label> Region</label>
              <div>
                <button className="regionSelec">Americas</button>
                <button className="regionSelec">Antarctic</button>
                <button className="regionSelec">Africa</button>
                <button className="regionSelec">Asia</button>
                <button className="regionSelec">Europe</button>
                <button className="regionSelec">Oceania</button>
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
                <tr>
                  <td>China</td>
                  <td>China</td>
                  <td>1,400,000.000</td>
                  <td>9,777,000</td>
                  <td>Asia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
