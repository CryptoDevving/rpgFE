import React from 'react';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path
import './InventoryStyle.css';

interface UserInventoryProps {
    onItemClick: (item: IInventorySlot & ItemDetails & { slotIndex: number }) => void;
    items: (IInventorySlot & ItemDetails & { slotIndex: number })[];
}

const UserInventory: React.FC<UserInventoryProps> = ({ onItemClick, items }) => {
    const frameImage = '/figmaExports/FrameLogin.png';
    const slotImage = '/figmaExports/components/slot.png';

    return (
        <div className="frame-box">
            <img src={frameImage} alt="Inventory Frame" draggable="false" />
            <h1 className="text-above">INVENTORY</h1>
            <div className="slots-container">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="slot"
                        style={{
                            backgroundImage: `url(${slotImage})`,
                            opacity: item.unlocked ? 1 : 0.45
                        }}
                        onClick={() => onItemClick(item)}
                    >
                        <img src={item.imageUrl} alt={`Item ${item.itemId}`} style={{ width: '70px', height: '70px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInventory;
