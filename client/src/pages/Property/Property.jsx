import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Property.css";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { cancelBooking, getAllBooking, getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import ShowerIcon from "@mui/icons-material/Shower";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import KingBedIcon from "@mui/icons-material/KingBed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import HotTubIcon from "@mui/icons-material/HotTub";
import PoolIcon from "@mui/icons-material/Pool";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Map from "../../components/Map/Map";
import useAuth from "../../hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModel from "../../components/BookingModel/BookingModel";
import { toast } from "react-toastify";
import Like from "../../components/Like/Like";
const Property = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { validLogin } = useAuth();
    const token = localStorage.getItem("token");
  const { user } = useAuth0();
  const { data, isLoading, isError } = useQuery(["property", id], () =>
    getProperty(id)
  );
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    error,
  } = user?.email
    ? useQuery(["bookings", user?.email], () => getAllBooking(user?.email))
    : { data: [], isLoading: false, error: null };
    const { data: likes } = useQuery(["like"], () =>
      getLikes(user?.email)
    );

    const { mutate } = useMutation({
      mutationFn: () => cancelBooking(user?.email, booking.id, token),
      onSuccess: () => handleBookingCancel(),
      onError: ({ response }) =>
        toast.error(`Failed to cancel the visit`),
    });

     const [showFullDesc, setShowFullDesc] = useState(false);
     const maxDesc=280;
     const toggleShowFullDesc = () => {
       setShowFullDesc(!showFullDesc);
     };

  if (isError) {
    return (
      <div className="flexCenter paddings">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
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

  const booking = bookings?.find((booking) => booking.id === id);

  if (isLoadingBookings) return <div>Loading...</div>;
  if (error) {
    console.log("Error fetching bookings:", error);
  }

  const handleBookingCancel = () => {
    toast.success("Your booking has been cancelled!");
  };
  

  const handleCancelBooking = () => {
    mutate();
  };

  return (
    <>
      <Header />
      <section className="property">
        <div className="property-container innerWidth paddings flexColStart">
          <div className="like">
            <Like id={id} />
          </div>
          <img src={data?.image} alt="property" />

          <div className="flexCenter property-info">
            <div className="flexColStart left">
              <div className="flexStart head">
                <span className="primaryText">{data?.name}</span>
                <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                  ${data?.price}
                </span>
              </div>

              <div className="flexStart facilities">
                {data?.facilities?.bathrooms > 0 && (
                  <div className="flexStart facility">
                    <ShowerIcon size={20} />
                    <span>{data?.facilities?.bathrooms} Bathrooms</span>
                  </div>
                )}

                {data?.facilities?.sauna > 0 && (
                  <div className="flexStart facility">
                    <HotTubIcon size={20} />
                    <span>{data?.facilities?.sauna} Sauna</span>
                  </div>
                )}

                {data?.facilities?.parking > 0 && (
                  <div className="flexStart facility">
                    <DirectionsCarIcon size={20} />
                    <span>{data?.facilities?.parking}Parking</span>
                  </div>
                )}

                {data?.facilities?.gym && (
                  <div className="flexStart facility">
                    <FitnessCenterIcon size={20} />
                    <span>{data?.facilities?.gym} Gym</span>
                  </div>
                )}

                {data?.facilities?.bedrooms && (
                  <div className="flexStart facility">
                    <KingBedIcon size={20} />
                    <span>{data?.facilities?.bedrooms} Bedrooms</span>
                  </div>
                )}

                {data?.facilities?.clubHouse && (
                  <div className="flexStart facility">
                    <MeetingRoomIcon size={20} />
                    <span>{data?.facilities?.clubHouse} Club House</span>
                  </div>
                )}

                {data?.facilities?.tennis && (
                  <div className="flexStart facility">
                    <SportsTennisIcon size={20} />
                    <span>{data?.facilities?.tennis} Tennis Court</span>
                  </div>
                )}

                {data?.facilities?.swimmingPool && (
                  <div className="flexStart facility">
                    <PoolIcon size={20} />
                    <span>{data?.facilities?.swimmingPool} Swimming Pool</span>
                  </div>
                )}
              </div>

              <div className="flexStart" style={{ gap: "1rem" }}>
                <span className="secondaryText">Type: {data?.type}</span>
                <span className="secondaryText">
                  Size: {data?.squareFeet} sqft
                </span>
              </div>

              <span className="secondaryText" style={{ textAlign: "center" }}>
                {data?.desc.length > maxDesc && !showFullDesc
                  ? `${data?.desc.substring(0, maxDesc)}...`
                  : data?.desc}
                  {
                    data?.desc.length>maxDesc && (
                      <button onClick={toggleShowFullDesc} style={{ marginLeft: '5px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
                        {showFullDesc?"Show Less":"Show More"}
                      </button>
                    )}
              </span>

              <div className="flexStart" style={{ gap: "1rem" }}>
                <LocationOnIcon size={25} />
                <span className="secondaryText">
                  {data?.address}, {data?.city}, {data?.country}
                </span>
              </div>

              {booking ? (
                <>
                  <button
                    variant="outline"
                    style={{
                      width: "100%",
                      color: "red",
                      padding: "7px",
                      cursor: "pointer",
                    }}
                    onClick={handleCancelBooking}
                  >
                    Cancel Booking
                  </button>
                  <span>Your booking is confirmed for {booking.date}</span>
                </>
              ) : (
                <button
                  className="btn"
                  onClick={() => validLogin() && setIsModalVisible(true)}
                >
                  Book Visit
                </button>
              )}
              <BookingModel
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                propertyId={id}
                email={user?.email}
              />
            </div>

            <div className="map">
              <Map
                address={data?.address}
                city={data?.city}
                country={data?.country}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Property;
