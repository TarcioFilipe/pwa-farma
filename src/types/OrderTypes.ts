export type ShoppingEntityType = {
    id: number;
    storeAddress: string;
    deliveryAddress: string;
    deliveryTime: string;
    duration: string;
    status: number;
    verificationCode: string;
    storeCode: string;
    value: string;
    modoPagamento: number;
    userClientId: number;
}

export interface DetailProps {
    id: number;
    status: number;
    userDeliveryId: number;
    shoppingId: number;
    shoppingEntity: ShoppingEntityType;
}
