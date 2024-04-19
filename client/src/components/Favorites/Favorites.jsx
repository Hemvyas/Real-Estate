import React, { useEffect, useState } from "react";
import "../../Residency/Residency.css";
import SeachBar from "../../components/SearchBar/Search";
import { PuffLoader } from "react-spinners";
import Cards from "../../components/Cards/Cards";
import { useQuery } from "react-query";
import { getLike, getProperty } from "../../utils/api";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header/Header";

const Favorites = () => {
  const { user } = useAuth0();
  const [favorite, setFavorite] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: likes,
    isLoading: isLoadingfavorites,
    isError: isfavoritesError,
  } = user?.email
    ? useQuery(["favorites", user?.email], () => getLike(user?.email))
    : { data: [], isLoading: false, error: null };
    console.log(likes);
  useEffect(() => {
    const favorites = async () => {
      if (!likes || likes.length === 0) return;
      setLoadingDetails(true);
      try {
        const propertyDetails = likes.map((id) => getProperty(id));
        const likedProperties = await Promise.all(propertyDetails);
        setFavorite(likedProperties);
      } catch (error) {
        console.error("Failed to fetch property details", error);
        setError(error);
      } finally {
        setLoadingDetails(false);
      }
    };
    favorites();
  }, [likes]);

  if (isfavoritesError || error) {
    return <div>Error while fetching data</div>;
  }

  if (isLoadingfavorites || loadingDetails) {
    return <div>Loading...</div>;
  }


  const searchedData = favorite.filter(
    (card) =>
      card?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card?.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingfavorites) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
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
          <SeachBar onSearch={setSearchQuery} />
        </div>
        <div className="paddings flexCenter ">
          {searchedData &&
            searchedData.map((card, i) => <Cards card={card} key={i} />)}
        </div>
      </section>
    </>
  );
};

export default Favorites;
