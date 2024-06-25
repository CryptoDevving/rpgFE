import React from 'react';
import { IInventorySlot, ItemDetails } from "../context/types";
import WhiteButton from "./WhiteButton"; // Ensure the correct import path
import './ItemDetailsShow.css'; // Import the CSS file

interface ItemDetailsShowProps {
    item: IInventorySlot & ItemDetails & { slotIndex: number };
    onClose: () => void;
    onSell?: () => void;  // Made optional
    onEquip?: () => void;  // Made optional
    buttonShow: 'sell' | 'equip';  // New prop to determine which button to show
}

const ItemDetailsShow: React.FC<ItemDetailsShowProps> = ({ item, onClose, onSell, onEquip, buttonShow }) => {
    return (
        <div className="item-details-container">
            <div className="item-image-container">
                <img src="../figmaExports/components/Slot.png" alt="Item Slot" className="item-slot-image" />
                <img src={item.imageUrl} alt={item.itemName} className="item-image" />
            </div>
            <h2>{item.itemName}</h2>
            <p>Type: {item.itemType}</p>
            <p>Rarity: {item.rarity}</p>
            <p>Price: {item.price}</p>
            {/*<p>Stats:</p>*/}
            <p> DMG: {item.bonusStats.dmg} | SPD: {item.bonusStats.spd}</p>
            <p>CRT: {item.bonusStats.crt} | MNA: {item.bonusStats.mna}</p>
            <div className="button-group">
                {buttonShow === 'sell' && onSell && (
                    <WhiteButton onClick={onSell} text="Sell" />
                )}
                {buttonShow === 'equip' && onEquip && (
                    <WhiteButton onClick={onEquip} text="Equip" />
                )}
                <WhiteButton onClick={onClose} text="Close" />
            </div>
        </div>
    );
};

export default ItemDetailsShow;
