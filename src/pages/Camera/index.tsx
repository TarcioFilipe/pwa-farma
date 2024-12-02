import React, { useEffect } from "react";

import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView, Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanningResult, CameraType } from "expo-camera/build/legacy/Camera.types";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import api from "../../services/api";

interface codeScan {
    onBarcodeScanned: (scannigResult: BarCodeScanningResult) => void
}

export default function Camera() {
    const navigation = useNavigation();

    const [facing, setFacing] = useState<string>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(false);

    const scanAnimation = useSharedValue(0);

    useEffect(() => {
        scanAnimation.value = withRepeat(
            withTiming(1, { duration: 1000, easing: Easing.linear }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: scanAnimation.value * 250 }],
        };
    });

    if (!permission) {
        return (
            <View>
                <ActivityIndicator size={32} color={'#121212'} />
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function handleBack() {
        navigation.goBack();
    }

    const handleBarCodeScanned = async ({ type, data }: { type: string, data: string }) => {
        if (scanning) return;

        setScanning(true);
        console.log(data)

        try {
            const response = await api.post(`/deliveryqueue/${data}`, {

            });

            console.log('PEDIDO ADICIONADO');
            navigation.goBack();

        } catch (err) {
            alert('erro ao adicionar tente novamente: ' + err);   
        } finally {
            setScanning(false)
        }


    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={'back'}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={handleBarCodeScanned}
            >
                <View style={styles.contentCamera}>
                    <TouchableOpacity style={styles.backButton} onPress={() => handleBack()}>
                        <Feather name="arrow-left" size={24} color={'#121212'} />
                    </TouchableOpacity>

                    <View style={styles.scannerFrame}>
                        <Animated.View style={[styles.scanLine, animatedStyle]} />
                    </View>
                </View>
            </CameraView>
            {scanning && <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />}
        </View>
    )
}

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
    },
    contentCamera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scannerFrame: {
        width: 250,
        height: 250,
        borderWidth: 4,
        borderColor: 'rgba(0, 255, 0, 0.7)',
        overflow: 'hidden',
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: 'rgba(0, 255, 0, 0.7)',
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        width: 250,
        height: 250,
        borderWidth: 1,
        borderColor: 'green',
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        backgroundColor: '#FFF',
        position: 'absolute',
        borderRadius: 99,
        paddingHorizontal: 32,
        paddingVertical: 10,
        left: 32,
        top: 64
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -18 }, { translateY: -18 }],
    },
});