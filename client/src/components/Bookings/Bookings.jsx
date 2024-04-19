import React, { useEffect, useState } from "react";
import "../../Residency/Residency.css";
import SeachBar from "../../components/SearchBar/Search";
import { PuffLoader } from "react-spinners";
import Cards from "../../components/Cards/Cards";
import { useQuery } from "react-query";
import { getAllBooking, getProperty } from "../../utils/api";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header/Header";

const Bookings = () => {
  const { user } = useAuth0();
  const [detailedBookings, setDetailedBookings] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);
 const [searchQuery, setSearchQuery] = useState("");
  const {
    data: bookingsData,
    isLoading: isLoadingBookings,
    isError: isBookingsError,
  } = user?.email
    ? useQuery(["bookings", user?.email], () => getAllBooking(user?.email))
    : { data: [], isLoading: false, error: null };

    useEffect(() => {
      const bookings = async () => {
        if (!bookingsData || bookingsData.length === 0) return;
        setLoadingDetails(true);
        try {
          const propertyDetails = bookingsData.map((booking) =>
            getProperty(booking.id)
          );
          const bookedProperties = await Promise.all(propertyDetails);
          setDetailedBookings(bookedProperties);
        } catch (error) {
          console.error("Failed to fetch property details", error);
          setError(error);
        } finally {
          setLoadingDetails(false);
        }
      };
      bookings();
    }, [bookingsData]);

      if (isBookingsError || error) {
        return <div>Error while fetching data</div>;
      }

      if (isLoadingBookings || loadingDetails) {
        return <div>Loading...</div>;
      }

 

  const searchedData = detailedBookings?.filter(
    (card) =>
      card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingBookings) {
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

export default Bookings;
