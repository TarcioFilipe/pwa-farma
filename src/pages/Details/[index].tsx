import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { Button, Layout } from "@ui-kitten/components";
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Clipboard from 'expo-clipboard';
import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";
import InputText from "../../components/InputText";


interface DetailProps {
    name: string;
    price: number;
    deliveryTime: string;
    deliveryAddress: string;
    value: string;
    modoPagamento: number;
    id: number;
}

export default function Details() {
    const navigation = useNavigation()
    const route: any = useRoute();
    const { orderId, orderStatus } = route.params;

    const inputRefs: any = [useRef(), useRef(), useRef(), useRef()];
    const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);

    const [orderDetail, setOrderDetail] = useState<DetailProps[]>([]);
    const [deliveryMoto, setDeliveryMoto] = useState<boolean>(false);
    const [deliveryArrive, setdeliveryArrive] = useState<boolean>(false);
    const [codeInput, setCodeInput] = useState<string>('');
    const [copiedText, setCopiedText] = useState<string>('');

    useEffect(() => {
        async function getDetail() {
            if (orderStatus === 7) {
                setDeliveryMoto(true);
            } else if (orderStatus === 8) {
                setDeliveryMoto(true);
                setdeliveryArrive(true);
            }

            try {
                const response = await api.get(`/product/findByShopping/${orderId}`);
                setOrderDetail(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getDetail();
    }, [orderId, orderStatus]);

    const copyToClipboard = async () => {
        if (orderDetail.length > 0 && orderDetail[0].deliveryAddress) {
            await Clipboard.setStringAsync(orderDetail[0].deliveryAddress);
            alert('Endereço copiado para a área de transferência');
        }
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    function goMap() {
        if (Platform.OS === 'android') {
            Linking.openURL('google.navigation:q=Praça Silvio Romero');
        } else if (Platform.OS === 'ios') {
            Linking.openURL('maps://app?saddr=Eleonora cintra, 960&daddr=Praça Silvio Romero');
        } else {
            Linking.openURL('google.navigation:q=Praça Silvio Romero');
        }
    }

    function makePhoneCall() {
        const phoneNumber = '85981568064';
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) => console.error('Error:', err));
    }

    async function activeDeliveryMoto() {
        if (!deliveryMoto) {
            try {
                await api.patch(`/shopping/updateStatus/${orderId}/${7}`);
                setDeliveryMoto(true);
            } catch (err) {
                console.log('Erro ao ativar à caminho', err);
            }
        }
    }

    async function activeDeliryArrive() {
        if (!deliveryArrive && deliveryMoto) {
            try {
                await api.patch(`/shopping/updateStatus/${orderId}/${8}`);
                setdeliveryArrive(true);
            } catch (err) {
                console.log('Erro ao ativar cheguei ao lovcal')
            }
        } else {
            console.log('conclua a etapa anterior primeiro')
        }

    }

    async function confirmCode() {
        let aux: any = [];

        for (let i = 0; i < inputValues.length; i++) {
            aux += inputValues[i]
        }

        if (aux !== '' && aux.length === 4) {
            console.log(aux)

            try {
                const response = await api.post(`/deliveryqueue/validateDelivery/${orderId}/${aux}`);
                navigation.goBack()
            } catch (err) {
                console.log('CODIGO INVALIDO: ', err)
                setInputValues(["", "", "", ""])
                inputRefs[0].current.focus()
            }
        } else {
            console.log('condigo invalido');
            setInputValues(["", "", "", ""])
            inputRefs[0].current.focus()
        }

    }

    function handleCodigo(index: number, text: string) {

        inputValues[index] = text;
        setInputValues([...inputValues]);

        if (index < inputRefs.length - 1 && text.length === 1) {
            inputRefs[index + 1].current.focus()

        } else if (index > 0 && text.length === 0) {
            inputRefs[index - 1].current.focus()
        }
    }


    return (
        <KeyboardAvoidingView style={styles.safeArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Header title="Vamos junto levar o pedido até o endereço? 😀" />
                        <View style={styles.container}>
                            <View style={{ gap: 4 }}>
                                <Text style={styles.title}>Endereço de entrega</Text>
                                <View style={styles.cardContainer}>
                                    <View style={styles.bodyCard}>
                                        <Text>{orderDetail.length > 0 ? orderDetail[0].deliveryAddress : "Carregando endereço..."}</Text>
                                        <TouchableOpacity onPress={copyToClipboard}>
                                            <Feather name="copy" size={24} color={"#121212"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.actionsButtons}>
                                <TouchableOpacity
                                    style={[styles.cardContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}
                                    onPress={makePhoneCall}
                                >
                                    <Text style={styles.textCard}>Ligar</Text>
                                    <Feather name="phone-call" size={20} color={'#121212'} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.cardContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}
                                    onPress={goMap}
                                >
                                    <Text style={styles.textCard}>Navegar</Text>
                                    <Feather name="map-pin" size={20} color={'#121212'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.areaSwitch}>
                                <View style={styles.itemSwitch}>
                                    <Switch onValueChange={() => activeDeliveryMoto()} value={deliveryMoto} />
                                    <Text style={styles.textSwitch}>À caminho, indo até você!</Text>
                                </View>

                                <View style={styles.itemSwitch}>
                                    <Switch onValueChange={() => activeDeliryArrive()} value={deliveryArrive} />
                                    <Text style={styles.textSwitch}>Cheguei ao local da entrega</Text>
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            <View style={{ flex: 0.7 }}>
                                <View style={styles.footer}>
                                    <View style={styles.areaCode}>
                                        <TextInput
                                            ref={inputRefs[0]}
                                            keyboardType="number-pad"
                                            placeholder="*"
                                            value={inputValues[0]}
                                            onChangeText={(text) => handleCodigo(0, text)}
                                            style={styles.inputCode}
                                            maxLength={1}
                                        />
                                        <TextInput
                                            ref={inputRefs[1]}
                                            keyboardType="number-pad"
                                            placeholder="*"
                                            value={inputValues[1]}
                                            onChangeText={(text) => handleCodigo(1, text)}
                                            style={styles.inputCode}
                                            maxLength={1}
                                        />
                                        <TextInput
                                            ref={inputRefs[2]}
                                            keyboardType="number-pad"
                                            placeholder="*"
                                            value={inputValues[2]}
                                            onChangeText={(text) => handleCodigo(2, text)}
                                            style={styles.inputCode}
                                            maxLength={1}
                                        />
                                        <TextInput
                                            ref={inputRefs[3]}
                                            keyboardType="number-pad"
                                            placeholder="*"
                                            value={inputValues[3]}
                                            onChangeText={(text) => handleCodigo(3, text)}
                                            style={styles.inputCode}
                                            maxLength={1}
                                        />
                                    </View>

                                    <Pressable
                                        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, backgroundColor: '#2277ee' }, styles.button]}
                                        onPress={() => confirmCode()}
                                    >
                                        <Text style={styles.textButton}>
                                            Confirmar entrega
                                        </Text>
                                    </Pressable>
                                </View>
                                <Text>{deliveryMoto ? 'true' : 'false'} Status: {orderStatus} Delivery ID: {orderId}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#EFF3F7',
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 16
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    cardContainer: {
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderColor: '#3ACEB5',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
    },
    bodyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionsButtons: {
        gap: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textCard: {
        color: '#46A6CB',
        fontSize: 18,
        fontWeight: '700'
    },
    textSwitch: {
        fontSize: 18,
        fontWeight: '500'
    },
    areaSwitch: {
        gap: 20
    },
    itemSwitch: {
        gap: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#C8C8C8'
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
        fontWeight: 700,
        fontSize: 18
    },
    areaCode: {
        flexDirection: 'row',
        gap: 12
    },
    inputCode: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 4,
        borderColor: '#3ACEB5',
        borderWidth: 1,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        shadowColor: 'rgba(100, 100, 111, 0.2)',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 29,
        elevation: 5,
    },
    footer: {
        flex: 1,
        gap: 64,
        justifyContent: 'flex-end'
    }
});