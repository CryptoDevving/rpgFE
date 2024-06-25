import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IInventorySlot, ItemDetails } from "../context/types";
import { useUser } from "../context/UserContext";

interface EquipSlot {
    type: 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants' | 'shield';
    item: (IInventorySlot & ItemDetails & { slotIndex: number }) | null;
}

const itemTypes = {
    ARMOR: 'armor' as 'armor',
    HELMET: 'helmet' as 'helmet',
    WEAPON: 'weapon' as 'weapon',
    SHIELD: 'shield' as 'shield',
    RING: 'ring' as 'ring',
    PANTS: 'pants' as 'pants',
};

const initialSlots: EquipSlot[] = [
    { type: itemTypes.HELMET, item: null },
    { type: itemTypes.ARMOR, item: null },
    { type: itemTypes.WEAPON, item: null },
    { type: itemTypes.SHIELD, item: null },
    { type: itemTypes.RING, item: null },
    { type: itemTypes.RING, item: null },
    { type: itemTypes.PANTS, item: null },
];

interface HeroEquipProps {
    selectedItem: (IInventorySlot & ItemDetails & { slotIndex: number }) | null;
    onEquip: (item: (IInventorySlot & ItemDetails & { slotIndex: number }), slotIndex: number) => void;
    solanaAddress: string;
    equippedItems: any[];
}

const HeroEquip: React.FC<HeroEquipProps> = ({ selectedItem, onEquip, solanaAddress, equippedItems }) => {
    const [equippedSlots, setEquippedSlots] = useState<EquipSlot[]>(initialSlots);
    const frameImage = '/figmaExports/Hero Component.png';
    const slotImage = '/figmaExports/components/slot.png';
    const { user, setUser } = useUser();

    useEffect(() => {
        const slots = initialSlots.map((slot, index) => {
            const equippedItem = equippedItems.find(ei => ei.slotType === slot.type);
            return {
                ...slot,
                item: equippedItem || null,
            };
        });
        setEquippedSlots(slots);
    }, [equippedItems]);

    const handleEquipItem = async (slotIndex: number) => {
        if (!selectedItem) {
            console.log('No item selected');
            return;
        }

        const slot = equippedSlots[slotIndex];
        const selectedItemType = selectedItem.type.toLowerCase() as 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants' | 'shield';

        if (slot.type === selectedItemType || (slot.type === itemTypes.WEAPON && selectedItemType === itemTypes.WEAPON) || (slot.type === itemTypes.SHIELD && selectedItemType === itemTypes.SHIELD)) {
            try {
                console.log(`Equipping item: ${selectedItem.itemName}, type: ${selectedItem.type}, to slot: ${slotIndex}`);
                const response = await axios.post('http://localhost:8080/heroequipment/equip', {
                    solanaAddress,
                    itemId: selectedItem.itemId,
                    type: selectedItem.type,
                });

                if (response.status === 201) {
                    const newSlots = [...equippedSlots];
                    newSlots[slotIndex] = { ...slot, item: selectedItem };
                    setEquippedSlots(newSlots);
                    console.log('Equipped items updated:', newSlots);
                    onEquip(selectedItem, slotIndex);
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
        <div className="frame-box" style={{ position: 'relative', width: '450px', height: 'auto', marginLeft: "30%", marginTop: "60px" }}>
            <img src={frameImage} alt="Hero Equipment Frame" draggable="false" style={{ width: '450px', height: 'auto' }} />

            <h2 className="text-above" style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Hero Equipment</h2>

            <div style={{
                position: 'absolute',
                top: "100px",
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                minWidth: "400px",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                zIndex: 1
            }}>
                {equippedSlots.map((slot, index) => (
                    <div
                        key={index}
                        style={{
                            border: '0.5px solid #ccc',
                            padding: '11px',
                            margin: '5px',
                            height: "60px",
                            width: "60px",
                            backgroundColor: slot.item ? '#fff' : '#545454',
                            backgroundImage: `url(${slotImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: slot.item ? '#000' : '#777',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: slot.item ? 1 : 0.5
                        }}
                        onClick={() => handleEquipItem(index)}
                    >
                        {slot.item ? (
                            <>
                                <img src={slot.item.imageUrl} alt={`Item ${slot.item.itemId}`} style={{ width: '50px', height: '50px' }} />
                                {/*<p>{slot.item.itemName}</p>*/}
                            </>
                        ) : (
                            <button onClick={() => handleEquipItem(index)} disabled={!selectedItem || (slot.type !== selectedItem.type)}>
                                Equip
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {user && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    minWidth: "400px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: '#333',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    zIndex: 1
                }}>
                    <h3>{user.profileNickname}'s Profile</h3>
                    <p>Money: {user.money} </p>
                    <p>Level: {user.level}</p>
                    <p>Dungeon Level: {user.dungeonLevel}</p>
                    <p>Health Points: {user.healthPoints}</p>
                </div>
            )}
        </div>
    );
};

export default HeroEquip;
