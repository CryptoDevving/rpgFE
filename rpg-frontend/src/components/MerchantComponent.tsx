import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path

interface MerchantProps {
    selectedItem: (IInventorySlot & ItemDetails & { slotIndex: number }) | null;
    onItemSold: () => void;
}

const Merchant: React.FC<MerchantProps> = ({ selectedItem, onItemSold }) => {
    const { user, setUser } = useUser();
    const [merchantSlots, setMerchantSlots] = useState<{ item: (IInventorySlot & ItemDetails & { slotIndex: number }) | null, isUnlocked: boolean }[]>(Array(16).fill(null).map((_, i) => ({ item: null, isUnlocked: i < 8 })));
    const frameImage = '/figmaExports/FrameLogin.png';
    const slotImage = '/figmaExports/components/slot.png';

    const handleSellItem = async (index: number) => {
        if (selectedItem && user && merchantSlots[index].isUnlocked) {
            try {
                const response = await axios.post('http://localhost:8080/profiles/sell-item', {
                    userId: user._id,
                    itemId: selectedItem.itemId,
                    slotIndex: selectedItem.slotIndex  // Pass slotIndex
                });

                setUser(response.data.user);
                setMerchantSlots(prevSlots => {
                    const newSlots = [...prevSlots];
                    newSlots[index] = { ...newSlots[index], item: selectedItem };
                    return newSlots;
                });
                onItemSold();
            } catch (error) {
                console.error('Failed to sell item:', error);
            }
        }
    };

    return (
        <div className="frame-box" style={{ position: 'relative', width: '450px', height: 'auto', marginLeft: "30%", marginTop: "60px"}}>
            <img src={frameImage} alt="Merchant Frame" draggable="false" style={{ width: '450px', height: 'auto' }} />

            <h2 className="text-above" style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>MERCHANT</h2>

            <div style={{
                position: 'absolute',
                top: "100px", // Adjust this value as needed
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                minWidth: "400px",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                zIndex: 1
            }}>
                {merchantSlots.map((slot, index) => (
                    <div
                        key={index}
                        style={{
                            border: '0.5px solid #ccc',
                            padding: '11px',
                            margin: '5px',
                            height: "60px",
                            width: "60px",
                            backgroundColor: slot.isUnlocked ? '#fff' : '#545454',
                            backgroundImage: `url(${slotImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: slot.isUnlocked ? '#000' : '#777',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: slot.isUnlocked ? 1 : 0.5
                        }}
                        onClick={() => handleSellItem(index)}
                    >
                        {slot.item ? (
                            <>
                                <img src={slot.item.imageUrl} alt={`Item ${slot.item.itemId}`} style={{ width: '50px', height: '50px' }} />
                                {/*<p>{slot.item.itemName}</p>*/}
                            </>
                        ) : (
                            <button onClick={() => handleSellItem(index)} disabled={!selectedItem || (user?.money ?? 0) < selectedItem.price}>
                                Sell
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Merchant;
