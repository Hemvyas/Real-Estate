import React, { useEffect, useState } from "react";
import "./Residency.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SeachBar from "../components/SearchBar/Search";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Cards from "../components/Cards/Cards";
import { debounce } from "lodash";


const Residency = () => {
  const { data, isLoading, isError } =useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortPrice, setSortPrice] = useState("asc");

  useEffect(() => {
let filteredProperties=data;

 if (filterType !== "all") {
      filteredProperties =
        filteredProperties &&
        filteredProperties?.filter((card) => card.type === filterType);

    }
    filteredProperties =
      filteredProperties &&
      filteredProperties?.sort((a, b) =>
        sortPrice === "asc" ? a.price - b.price : b.price - a.price
      );


   if (searchQuery) {
     filteredProperties = filteredProperties.filter(
       (card) =>
         card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         card.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
         card.country.toLowerCase().includes(searchQuery.toLowerCase())
     );
   }
setFilteredData(filteredProperties);   
  }, [data, searchQuery, filterType, sortPrice]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="wrapper flexCenter">
        <PuffLoader
          height="60"
          width="60"
          radius={1}
          color="#4066ff"
          arial-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <>
      <Header />
      <section className="residency">
        <div className="flexColCenter paddings innerWidth r-container">
          <SeachBar onSearch={debouncedHandleSearch} />
        </div>
        <div className="flexStart filter" style={{ gap: "1rem" }}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "10px",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            <option value="all">
              All Types
            </option>
            <option value="townhouse">Townhouse</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            style={{
              padding: "10px",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            <option value="asc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
          </select>
        </div>

        <div className="paddings flexCenter ">
            {filteredData &&
              filteredData?.map((card, i) => <Cards card={card} key={i} />)}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Residency;
