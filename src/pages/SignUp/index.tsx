import { Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";

import { ActivityIndicator, Button, Image, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../../components/InputText";
import { AuthContext } from "../../context/auth";
import { Link } from "@react-navigation/native";
import InputPassword from "../../components/InputPassword";


export default function SignUp() {
    const { signIn, loading, signUp } = useContext(AuthContext);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [numberVehicle, setNumberVehicle] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow(!show);
    }

    async function handleSignUp() {
        signUp({
            name,
            email,
            password,
            confirmPassword,
            acceptTerms,
            phoneNumber,
            numberVehicle,
            cpf
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text category="h3" style={{ textAlign: "center" }}>Cadastro</Text>
                    </View>

                    {/* <View style={styles.areaImage}>
                        <Image source={require('../../assets/medico_seringa.png')} style={{ width: '100%', height: '100%' }} />
                    </View> */}

                    <View style={styles.content}>
                        <View>
                            <InputText
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder="Seu nome completo"
                                inputMode="text"
                                autoCapitalize="sentences"
                                style={styles.input}
                                icon={'user'}
                            />

                            <InputText
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Seu email"
                                inputMode="email"
                                style={styles.input}
                                icon={'mail'}
                            />

                            <InputText
                                value={cpf}
                                onChangeText={(text) => setCpf(text)}
                                inputMode="numeric"
                                placeholder="Seu CPF"
                                style={styles.input}
                                icon={'file-text'}
                            />

                            <InputText
                                value={numberVehicle}
                                onChangeText={(text) => setNumberVehicle(text)}
                                inputMode="text"
                                placeholder="Placa do seu veiculo"
                                autoCapitalize="words"
                                style={styles.input}
                                icon={'file'}
                            />

                            <InputText
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text)}
                                inputMode="numeric"
                                placeholder="Numero de celular"
                                style={styles.input}
                                icon={'phone'}
                            />

                            <InputPassword
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                inputMode="text"
                                placeholder="Sua senha"
                                secureTextEntry={!show}
                                isShow={toggleShow}
                                style={styles.input}
                                icon="lock"
                            />

                            <InputPassword
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                inputMode="text"
                                placeholder="Confirme sua senha"
                                secureTextEntry={!show}
                                isShow={toggleShow}
                                style={styles.input}
                                icon="lock"
                            />

                            <Link to={{ screen: "SignIn" }} style={{ marginTop: 12 }}>
                                <Text>Já possuo cadastro?</Text>
                            </Link>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.8 : 1,
                                    backgroundColor: '#2277ee'
                                },
                                styles.button,
                            ]}
                            onPress={() => handleSignUp()}
                        >
                            {loading ? (
                                <ActivityIndicator size={16} color={'#FFF'} />
                            ) : (
                                <Text style={styles.textButton}>Cadastrar</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        gap: 64,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingTop: 64,
        paddingBottom: 32,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        paddingHorizontal: 40,
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
});