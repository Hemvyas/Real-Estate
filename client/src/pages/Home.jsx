import React, { useEffect } from "react";
import "../App.css";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Companies from "../components/Companies/Companies";
import Properties from "../components/Properties/Properties";
import Services from "../components/Services/Services";
import Contact from "../components/Contact/Contact";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";

const Home = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email,token),
  });
  useEffect(() => {
    const getToken = async () => {
      if (!isAuthenticated) return;
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: import.meta.env.VITE_APP_AUDIENCE,
          scope: "openid profile email",
        },
      });
      localStorage.setItem("token", token);
      mutate(token);
    };
    isAuthenticated && getToken();
  }, [isAuthenticated, getAccessTokenWithPopup,mutate]);
  return (
    <div>
      <Header />
      <Hero />
      <Companies />
      <Properties />
      <Services />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
