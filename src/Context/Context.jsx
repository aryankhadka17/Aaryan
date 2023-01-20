import { useSlotProps } from "@mui/base";
import React, { useState, createContext, useEffect } from "react";

export const SelectedContext = createContext();

export const SelectProvider = (props) => {
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    if (selectedData.length > 0) {
      localStorage.setItem("data", JSON.stringify(selectedData));
    }
  }, [selectedData]);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setSelectedData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  return (
    <SelectedContext.Provider value={[selectedData, setSelectedData]}>
      {props.children}
    </SelectedContext.Provider>
  );
};
