import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Buy from "../Pages/Buy";
import Rent from "../Pages/Rent";
import Contactus from "../Pages/Contactus";
import PropertyDetails from "../Pages/PropertyDetails";
import Sell from "../Pages/Sell";
import Pricing from "../Pages/Pricing";
import LoginRequired from "../Components/LoginRequired";
import AdminPanel from "../Pages/AdminPanel";

const Navroutes = ({
  data,
  setData,
  loggedIn,
  properties,
  loading,
  refreshProperties,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/buy"
        element={<Buy properties={properties} loading={loading} />}
      />
      <Route
        path="/rent"
        element={<Rent properties={properties} loading={loading} />}
      />
      <Route path="/contact-us" element={<Contactus />} />
      <Route
        path="/sell"
        element={
          loggedIn ? (
            <Sell refreshProperties={refreshProperties} />
          ) : (
            <LoginRequired />
          )
        }
      />
      <Route
        path="/property/:id"
        element={<PropertyDetails properties={properties} />}
      />
      <Route path="/pricing" element={loggedIn ? (
            <Pricing />
          ) : (
            <LoginRequired />
          )
        } />
      <Route
        path="/admin"
        element={
          loggedIn && data?.role === "admin" ? (
            <AdminPanel
              properties={properties}
              refreshProperties={refreshProperties}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default Navroutes;
