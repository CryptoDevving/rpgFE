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
        <div>
            <h2>Merchant</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxWidth: '400px' }}>
                {merchantSlots.map((slot, index) => (
                    <div key={index} style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '5px',
                        height: "80px",
                        backgroundColor: slot.isUnlocked ? '#fff' : '#545454',
                        color: slot.isUnlocked ? '#000' : '#777',
                        textAlign: 'center',
                    }}>
                        {slot.item ? (
                            <>
                                <img src={slot.item.imageUrl} alt={`Item ${slot.item.itemId}`} style={{ width: '50px', height: '50px' }} />
                                <p>{slot.item.itemName}</p>
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
