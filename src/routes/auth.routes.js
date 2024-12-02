import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../pages/Signin";
import SignUp from "../pages/SignUp";

const  AuthStack = createNativeStackNavigator();


export default function AuthRoutes() {
    return (
        <AuthStack.Navigator 
        screenOptions={{
            headerShown: false
        }}
        >
            <AuthStack.Screen
                name="SignIn"
                component={Signin}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
            />
        </AuthStack.Navigator>
    )
}