import React from 'react';
import { IInventorySlot, ItemDetails } from "../context/types";

interface ItemDetailsModalProps {
    item: IInventorySlot & ItemDetails & { slotIndex: number };
    onClose: () => void;
    onSell?: () => void;  // Made optional
    onEquip?: () => void;  // Made optional
    buttonShow: 'sell' | 'equip';  // New prop to determine which button to show
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose, onSell, onEquip, buttonShow }) => {
    return (
        <div style={{color:"white"}}>
            <img src={item.imageUrl} alt={item.itemName} style={{ width: '100px', height: '100px' }} /> {/* Image added */}
            <h2>{item.itemName}</h2>
            <p>Type: {item.itemType}</p>
            <p>Rarity: {item.rarity}</p>
            <p>Price: {item.price}</p>
            <p>Sell Duration: {item.sellDuration}s</p>
            <p>Stats:</p>
            <ul>
                <li>Damage: {item.bonusStats.dmg}</li>
                <li>Speed: {item.bonusStats.spd}</li>
                <li>Crit: {item.bonusStats.crt}</li>
                <li>Mana: {item.bonusStats.mna}</li>
            </ul>
            {buttonShow === 'sell' && onSell && (
                <button onClick={onSell}>Sell</button>
            )}
            {buttonShow === 'equip' && onEquip && (
                <button onClick={onEquip}>Equip</button>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ItemDetailsModal;
