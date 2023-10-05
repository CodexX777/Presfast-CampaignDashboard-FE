import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { CustomerData } from "./CustomerData";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [data, setData] = useState(CustomerData);

  return <CustomerContext.Provider value={{ contextData: [data, setData] }}><Outlet /></CustomerContext.Provider>;
};
