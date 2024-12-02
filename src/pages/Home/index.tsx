import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";

import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, ButtonGroup, Layout, Text, Tab, TabView } from "@ui-kitten/components";
import { Link, useFocusEffect, useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";
import CardItem from "../../components/CardItem";
import { DetailProps } from "../../types/OrderTypes";

export default function Home() {
    const navigation: any = useNavigation();

    const [data, setData] = useState<DetailProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const getDetail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/deliveryqueue/findByUserDelivery');
            setData(response.data);
        } catch (error) {
            console.log('ERRO AO PUXAR INFORMAÇÕES: ', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getDetail();
        }, [getDetail])
    );

    function handleDetail(id: number, status: number) {
        navigation.navigate("Details", { orderId: id, orderStatus: status });
    }

    const renderList = (dataList: DetailProps[]) => (
        <FlatList
            data={dataList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <CardItem
                    data={item}
                    OnpressItem={() => handleDetail(item.id, item.status)}
                />
            )}
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Aqui você pode visualizar os próximos pedidos da sua rota 😀" />

            <View style={styles.container}>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Feather name="camera" size={24} color={'#121212'} />

                    <Link style={styles.photoLink} to={{ screen: 'Camera' }}>
                        <Text category="h6">Escanear mais uma rota</Text>
                    </Link>
                </View>

                <TabView
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    style={{paddingTop: 24, flex: 1}}
                    indicatorStyle={{ }}
                >
                    <Tab title='Em Andamento'>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : data.length > 0 ? (
                            renderList(data.filter(order => order.shoppingEntity.status !== 4))
                        ) : (
                            <View style={styles.content}>
                                <Text category="s1" style={{ textAlign: "center" }}>
                                    Nenhum pedido precisando ser
                                    entregue no momento! 🤔
                                </Text>

                                <Button onPress={getDetail}>Recarregar</Button>

                                <View style={styles.image}>
                                    <Image source={require('../../assets/medico.png')} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        )}
                    </Tab>

                    <Tab title='Finalizados'>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : data.length > 0 ? (
                            renderList(data.filter(order => order.shoppingEntity.status === 4))
                        ) : (
                            <View style={styles.content}>
                                <Text category="s1" style={{ textAlign: "center" }}>
                                    Nenhum pedido finalizado no momento!
                                </Text>

                                <Button onPress={getDetail}>Recarregar</Button>
                                
                                <View style={styles.image}>
                                    <Image source={require('../../assets/medico.png')} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        )}
                    </Tab>
                </TabView>
            </View>
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
        paddingVertical: 20
    },
    layout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'trasnparent'
    },
    photoLink: {
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        gap: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 300
    }
});