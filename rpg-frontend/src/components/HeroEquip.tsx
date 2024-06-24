import React from 'react';
import axios from 'axios';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path

interface EquipSlot {
    type: 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants';
    item: (IInventorySlot & ItemDetails & { slotIndex: number }) | null;
}

const itemTypes = {
    ARMOR: 'armor' as 'armor',
    HELMET: 'helmet' as 'helmet',
    WEAPON: 'weapon' as 'weapon',
    RING: 'ring' as 'ring',
    PANTS: 'pants' as 'pants',
};

const initialSlots: EquipSlot[] = [
    { type: itemTypes.HELMET, item: null },
    { type: itemTypes.ARMOR, item: null },
    { type: itemTypes.WEAPON, item: null },
    { type: itemTypes.WEAPON, item: null },
    { type: itemTypes.RING, item: null },
    { type: itemTypes.RING, item: null },
    { type: itemTypes.PANTS, item: null },
];

interface HeroEquipProps {
    selectedItem: (IInventorySlot & ItemDetails & { slotIndex: number }) | null;
    onEquip: (item: (IInventorySlot & ItemDetails & { slotIndex: number }), slotIndex: number) => void;
    solanaAddress: string;
}

const HeroEquip: React.FC<HeroEquipProps> = ({ selectedItem, onEquip, solanaAddress }) => {
    const [equippedItems, setEquippedItems] = React.useState<EquipSlot[]>(initialSlots);

    const handleEquipItem = async (slotIndex: number) => {
        if (!selectedItem) {
            console.log('No item selected');
            return;
        }

        const slot = equippedItems[slotIndex];
        const selectedItemType = selectedItem.type.toLowerCase() as 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants';

        if (slot.type === selectedItemType || (slot.type === itemTypes.WEAPON && selectedItemType === itemTypes.WEAPON)) {
            try {
                console.log(`Equipping item: ${selectedItem.itemName}, type: ${selectedItem.type}, to slot: ${slotIndex}`);
                // Call backend API to equip the item
                const response = await axios.post('http://localhost:8080/heroequipment/equip', {
                    solanaAddress, // Use the passed solanaAddress prop
                    itemId: selectedItem.itemId,
                    type: selectedItem.type,
                });

                if (response.status === 201) {
                    const newSlots = [...equippedItems];
                    newSlots[slotIndex] = { ...slot, item: selectedItem };
                    setEquippedItems(newSlots);
                    console.log('Equipped items updated:', newSlots);
                    onEquip(selectedItem, slotIndex); // Notify parent of the equip action
                } else {
                    console.error('Failed to equip item:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to equip item:', error);
            }
        } else {
            console.log('Selected item type does not match slot type');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
            <h2>Hero Equipment</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
                {equippedItems.map((slot, index) => (
                    <div
                        key={index}
                        style={{
                            width: '100px',
                            height: '100px',
                            border: '1px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#333',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleEquipItem(index)}
                    >
                        {slot.item ? (
                            <div style={{ textAlign: 'center' }}>
                                <img src={slot.item.imageUrl} alt={slot.item.type} style={{ width: '80px', height: '80px' }} />
                                <p>{slot.item.itemName}</p>
                            </div>
                        ) : (
                            <div style={{ color: '#777' }}>{slot.type}</div>
                        )}
                    </div>
                ))}
            </div> 
        </div>
    );
};

export default HeroEquip;
