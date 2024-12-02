import { Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";

import { ActivityIndicator, Button, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../../components/InputText";
import { AuthContext } from "../../context/auth";
import { Link } from "@react-navigation/native";
import InputPassword from "../../components/InputPassword";


export default function Signin() {
    const { signIn, loading } = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const toggleShow = () => {
        setShow(!show);
    }

    async function handlePress(email: string, password: string) {
        try {
            setError('');

            await signIn({
                email,
                password
            });
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                        <View style={styles.container}>
                            <View style={styles.title}>
                                <Text category="h3" style={{ textAlign: "center" }}>Login</Text>
                            </View>

                            <View style={styles.areaImage}>
                                <Image source={require('../../assets/medico.png')} style={{ width: '100%', height: '100%' }} />
                            </View>

                            <View style={styles.content}>
                                <View>
                                    <Text category="h6" style={styles.textContent}>Só mais um pouco! Escolha uma das opções abaio para acessar suas entregas</Text>
                                </View>
                                    
                                <View>
                                    <InputText
                                        label="Email"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Seu email"
                                        inputMode="email"
                                        style={styles.input}
                                        icon={'mail'}
                                    />

                                    <InputPassword
                                        label="Senha"
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        inputMode="text"
                                        placeholder="Sua senha"
                                        secureTextEntry={!show}
                                        isShow={toggleShow}
                                        style={styles.input}
                                        icon="lock"
                                    />

                                    <Link to={{ screen: "SignUp" }}>
                                        <Text>ainda não possui cadastro?</Text>
                                    </Link>

                                    {error !== '' && <Text style={styles.errorText}>{error}</Text> }
                                </View>

                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.8 : 1,
                                            backgroundColor: '#2277ee'
                                        },
                                        styles.button,
                                    ]}
                                    onPress={() => handlePress(email, password)}
                                >
                                    {loading ? (
                                        <ActivityIndicator size={16} color={'#FFF'} />
                                    ) : (
                                        <Text style={styles.textButton}>Login</Text>
                                    )}
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        alignItems: 'center'
    },
    areaImage: {
        width: 250,
        height: 250,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    textContent: {
        textAlign: 'center',
        paddingHorizontal: 24,
        color: '#494949',
    },
    input: {
        marginVertical: 4,
        width: '100%'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#6052FF',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 99,
        marginTop: 16,
        elevation: 3
    },
    textButton: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
        marginTop: 16,
        marginBottom: 16,
    },
});