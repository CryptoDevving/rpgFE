import React from 'react';
import { IInventorySlot, ItemDetails} from "../context/types";

interface ItemDetailsModalProps {
    item: IInventorySlot & ItemDetails;
    onClose: () => void;
    onSell: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose, onSell }) => {
    return (
        <div>
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
            <button onClick={onSell}>Sell</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ItemDetailsModal;
