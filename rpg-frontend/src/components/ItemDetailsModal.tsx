import React from 'react';
import { IInventorySlot, ItemDetails } from "../context/types";
import WhiteButton from "./WhiteButton";
import "./ItemDetailsModal.css";

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
            <div className="item-details-container">
                <div className="item-image-container">
            <img src="../figmaExports/components/Slot.png" alt="Item Slot" className="item-slot-image" />
            <img src={item.imageUrl} alt={item.itemName} className="item-image" /> {/* Image added */}
                </div>
                    <h2>{item.itemName}</h2>
                         <p>{item.itemType}</p>
                         <p>Rarity: {item.rarity}</p>
                         <p>Price: {item.price}</p>
            <p>Sell Duration: {item.sellDuration}s</p>
                </div>
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

export default ItemDetailsModal;
