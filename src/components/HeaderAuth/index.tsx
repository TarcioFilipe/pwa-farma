import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Feather from "@expo/vector-icons/Feather";

interface HeaderProps {
    title: string;
}


export default function Header({ title }: HeaderProps) {
    const navigation = useNavigation();

    function hanldeClose() {
        navigation.goBack();
    }

    return(
        <SafeAreaView>
            <View>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
            </View>
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
        paddingTop: 64,
        paddingBottom: 16
    },
    titleContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 16
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    textTitle : {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        width: '80%'
    },
    image: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center'
    }
})