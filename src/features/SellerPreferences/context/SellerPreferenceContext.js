import React, { createContext, useState } from "react";

export const SellerPreferenceContext = createContext();

export const SellerPreferenceProvider = ({ children }) => {
  const [sellerPreference, setSellerPreference] = useState({
    min : 0,
    max : 0,
    type : null,
  })

  return (
    <SellerPreferenceContext.Provider value={{ sellerPreference, setSellerPreference }
    }>
      {children}
    </SellerPreferenceContext.Provider>
  );
};