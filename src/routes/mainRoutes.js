import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/Home";
import Camera from "../pages/Camera";
import Details from "../pages/Details/[index]";

const Stack = createNativeStackNavigator();



export default function MainRoutes() {
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
            statusBarTranslucent: true,
            statusBarColor: 'trasparent'
        }}>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Camera"
                component={Camera}
            />
            <Stack.Screen
                name="Details"
                component={Details}
            />
        </Stack.Navigator>
    )
}