"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import store from "../config/store";
import { UserContext } from "@/utils/UserContext";

export default function ProviderWrapper({ children, user: initialUser }) {
  const [user, setUser] = useState(initialUser);

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </Provider>
  );
}
