"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {}, });

export const useUser = () => useContext(UserContext);
