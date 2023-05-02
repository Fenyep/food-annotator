import React from "react";
import { MyContextType } from "../interfaces/myContextType";

export const MainContext = React.createContext<MyContextType | undefined>(undefined);