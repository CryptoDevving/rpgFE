export interface IInventorySlot {
    itemId: number;
    quantity: number;
    equipped: boolean;
    unlocked: boolean;
}

export interface ItemDetails {
    itemId: number;
    itemName: string;
    itemType: string;
    rarity: string;
    price: number;
    sellDuration: number;
    bonusStats: {
        dmg: number;
        spd: number;
        crt: number;
        mna: number;
    };
    stackable: boolean;
    imageUrl: string;
}
