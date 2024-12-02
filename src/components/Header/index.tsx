import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Feather from "@expo/vector-icons/Feather";
import { AuthContext } from "../../context/auth";

interface HeaderProps {
    title: string;
}


export default function Header({ title }: HeaderProps) {
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation();

    function hanldeClose() {
        navigation.goBack();
    }

    return(
        <SafeAreaView>
            <LinearGradient
                colors={["#3ACEB5", "#4A97D3"]}
                style={[styles.container, { justifyContent: "flex-start", zIndex: 10 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.4, 1]}
            >
                <View style={styles.content}>
                    <View style={styles.titleContent}>
                        <Pressable style={styles.backButton} onPress={() => hanldeClose()}>
                            <Feather name="arrow-left" size={24} color={'#FFF'}/>
                        </Pressable>

                        <View style={styles.image}>
                            <Image source={require('../../assets/logo.png')}/>
                        </View>

                        <Pressable onPress={() => logout()}>
                            <Feather name="log-out" size={24} color={'#FFF'}/>
                        </Pressable>
                    </View>
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16
    },
    titleContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 99
    },
    textTitle : {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        width: '80%'
    },
    image: {

    }
})