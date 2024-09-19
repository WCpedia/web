import React, { useState } from "react";
import { IUserBasicProfile } from "../interface/interface";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  basicProfile: undefined as IUserBasicProfile | undefined,
  setBasicProfile: (value: IUserBasicProfile | undefined) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [basicProfile, setBasicProfile] = useState<IUserBasicProfile>();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        basicProfile,
        setBasicProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
