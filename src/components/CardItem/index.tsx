import React from "react";

import { Text } from "@ui-kitten/components";
import { Pressable, StyleSheet, View } from "react-native";

import { DetailProps, ShoppingEntityType } from "../../types/OrderTypes";

import Feather from "@expo/vector-icons/Feather";


interface ItemProps {
    id: number;
    codigo: string;
    endereco: string;
    time: string;
    status: string;
}


interface CardItemProps {
    data: DetailProps
    OnpressItem: () => void
}

export default function CardItem({ data, OnpressItem }: CardItemProps ) {

    function getStatus(status: number) {
        switch (status) {
            case 4:
                return 'green'
            case 6:
                return 'yellow'
            case 7:
                return 'orange'
            case 8:
                return 'blue'
        }
    }

    return (
        <Pressable style={styles.container} onPress={OnpressItem}>
            <View style={styles.header}>
                <View style={styles.textArea}>
                    <Text category="s1" style={{alignItems: "center"}}>
                        Pedido numero {data.id}
                    </Text>

                    <View style={[styles.circle, {backgroundColor: getStatus(data.shoppingEntity.status)}]}/>

                    <Text category="s1" style={{alignItems: "center"}}>
                       {data.shoppingEntity.status === 4 ? 'Finalizado' : 'Aguardando'}
                    </Text>
                </View>

                <Text category="s2">{data.shoppingEntity.deliveryAddress}</Text>
            </View>
            <View style={styles.body}>
                <Text category="c1">Código: {data.shoppingEntity.verificationCode}</Text>
                
                <View style={{flexDirection: "row", gap: 4, alignItems: 'center'}}>
                    <Feather name="clock" size={12} color={'#121212'}/>
                    <Text category="c2" style={{fontWeight: '700'}}>{data.shoppingEntity.duration}Min</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        marginBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderColor: '#3ACEB5',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 4
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 99,
        elevation: 2
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})