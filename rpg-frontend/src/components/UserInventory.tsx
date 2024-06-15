import React from 'react';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path
import './animation.css'

interface UserInventoryProps {
    onItemClick: (item: IInventorySlot & ItemDetails & { slotIndex: number }) => void;
    items: (IInventorySlot & ItemDetails & { slotIndex: number })[];
    selectedItem: (IInventorySlot & ItemDetails & { slotIndex: number }) | null; // Add this prop
}

const UserInventory: React.FC<UserInventoryProps> = ({ onItemClick, items, selectedItem }) => {
    const frameImage = '/figmaExports/FrameLogin.png';
    const slotImage = '/figmaExports/components/slot.png';
    const slotSelectImage = '/figmaExports/components/slotSelected.png';

    return (
        <div className="frame-box" style={{ position: 'relative', width: '450px', height: 'auto', marginLeft: "20%", marginTop: "60px"}}>
            <img src={frameImage} alt="Inventory Frame" draggable="false" style={{ width: '100%', height: 'auto' }} />

            <h1 className="text-above">INVENTORY</h1>

            <div style={{
                position: 'absolute',
                top: "80px", // Adjust this value as needed
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
                            position: 'relative',
                            margin: '10px',
                            height: "80px",
                            width: "80px",
                            cursor: 'pointer',
                            backgroundImage: `url(${slotImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: item.unlocked ? 1 : 0.5
                        }}
                        onClick={() => onItemClick(item)}
                    >
                        {selectedItem?.slotIndex === item.slotIndex && (
                            <img
                                src={slotSelectImage}
                                alt="Selected Slot Indicator"
                                className="selected-slot-animation" // Add animation class
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 1
                                }}
                            />
                        )}
                        <img src={item.imageUrl} alt={`Item ${item.itemId}`} style={{ width: '70px', height: '70px', zIndex: 2 }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInventory;
