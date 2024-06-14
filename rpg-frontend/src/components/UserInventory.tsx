import React from 'react';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path

interface UserInventoryProps {
    onItemClick: (item: IInventorySlot & ItemDetails & { slotIndex: number }) => void;
    items: (IInventorySlot & ItemDetails & { slotIndex: number })[];
}

const UserInventory: React.FC<UserInventoryProps> = ({ onItemClick, items }) => {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxWidth: '400px' }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            margin: '5px',
                            height: "80px",
                            backgroundColor: item.unlocked ? '#fff' : '#545454',
                            color: item.unlocked ? '#000' : '#777',
                            textAlign: 'center',
                        }}
                        onClick={() => onItemClick(item)}
                    >
                        <img src={item.imageUrl} alt={`Item ${item.itemId}`} style={{ width: '50px', height: '50px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInventory;
