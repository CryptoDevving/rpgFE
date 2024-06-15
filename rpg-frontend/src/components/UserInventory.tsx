import React from 'react';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path

interface UserInventoryProps {
    onItemClick: (item: IInventorySlot & ItemDetails & { slotIndex: number }) => void;
    items: (IInventorySlot & ItemDetails & { slotIndex: number })[];
}

const UserInventory: React.FC<UserInventoryProps> = ({ onItemClick, items }) => {
    const frameImage = '/figmaExports/FrameLogin.png';
    const slotImage = '/figmaExports/slot.png';

    return (
        <div className="frame-box" style={{ position: 'relative', width: '450px', height: 'auto', marginLeft: "20%", marginTop: "60px"}}>
            <img src={frameImage} alt="Inventory Frame" draggable="false" style={{ width: '100%', height: 'auto' }} />

            <h1 className="text-above">INVENTORY</h1>

            <div style={{
                position: 'absolute',
                top: "100px", // Adjust this value as needed
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            padding: '11px',
                            margin: '5px',
                            height: "60px",
                            width: "60px",
                            backgroundColor: item.unlocked ? '#fff' : '#545454',
                            color: item.unlocked ? '#000' : '#777',
                            textAlign: 'center',
                            cursor: 'pointer'
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
