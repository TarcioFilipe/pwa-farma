import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";


interface UserProps {
    id: number;
    email: string;
    name: string;
    role?: string;
    token?: string;
}

interface AuthContextData {
    user: UserProps;
    signed: boolean;
    loading: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>
    logout: () => void;
}

type AuthProviderProps = {
    children: ReactNode
}

interface SignInProps {
    email: string;
    password: string;
}

interface SignUpProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    phoneNumber: string;
    numberVehicle: string
    cpf: string;
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const navigation: any = useNavigation();

    const [user, setUser] = useState<UserProps>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadStorage = async () => {
            if (Platform.OS === 'web') {
                const tokenUser = localStorage.getItem('userToken');

                try {
                    const response = await api.get('/delivery/me', {
                        headers: {
                            Authorization: `Bearer ${tokenUser}`,
                        },
                    });

                    api.defaults.headers["Authorization"] = `Bearer ${tokenUser}`;

                    const { id, name, email } = response.data;

                    setUser({
                        id,
                        name,
                        email
                    });

                } catch (err) {
                    console.log('ERRO AO BUSCAR O TOTEM: ', err)
                    setUser(null);
                }

                console.log('Executou /me');
            }
        }

        loadStorage();

    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoading(true);

        try {
            const response = await api.post('/auth/loginDelivery', {
                password,
                email
            });

            const { id, name, role, token } = response.data;

            // const data = { 
            //     id,
            //     name,
            //     role,
            //     token,
            // };

            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            if (Platform.OS === 'web') {
                localStorage.setItem('userToken', token);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
            }

            setUser({
                id,
                email,
                name,
                role,
                token
            })

            setLoading(false);
        } catch (err) {
            console.log('Erro ao logar', err);
            setLoading(false);
            throw err;
        }
    }

    async function signUp({ name, email, password, confirmPassword, acceptTerms, phoneNumber, numberVehicle, cpf }: SignUpProps) {
        setLoading(true);

        try {
            const response = await api.post('/delivery/create', {
                name,
                email,
                password,
                confirmPassword,
                acceptTerms,
                phoneNumber,
                numberVehicle,
                cpf
            })

            navigation.navigate('SignIn');

        } catch (err) {
            console.log(err)
        }
    }

    function logout() {
        setUser(null);

        if (Platform.OS === "web") {
            localStorage.clear();
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user,
                loading,
                signIn,
                logout,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}