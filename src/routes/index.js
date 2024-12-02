import React, { useContext } from "react";
import MainRoutes from "./mainRoutes";
import { AuthContext } from "../context/auth";
import AuthRoutes from "./auth.routes";


export default function Routes() {
    const { signed } = useContext(AuthContext);

    return(
        signed ? <MainRoutes/> : <AuthRoutes/>
        // <MainRoutes/>
    )
}