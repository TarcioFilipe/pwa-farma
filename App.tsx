import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import Routes from './src/routes';
import { AuthProvider } from './src/context/auth';

export default function App() {
    return (
        <>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <AuthProvider>
                        <StatusBar style="dark" translucent />
                        <Routes />
                    </AuthProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
