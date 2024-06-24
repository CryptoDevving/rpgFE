import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInventory from '../components/UserInventory';
import ItemDetailsModal from '../components/ItemDetailsModal';
import { useUser } from '../context/UserContext';
import { IInventorySlot, ItemDetails } from '../context/types'; // Adjust the import path
import HeroEquip from '../components/HeroEquip'; // Import the HeroEquip component

const UserProfilePage: React.FC = () => {
    const { user, setUser } = useUser();
    const [items, setItems] = useState<(IInventorySlot & ItemDetails & { slotIndex: number })[]>([]);
    const [selectedItem, setSelectedItem] = useState<(IInventorySlot & ItemDetails & { slotIndex: number }) | null>(null);

    useEffect(() => {
        if (user && user.inventory) {
            const fetchItems = async () => {
                const itemDetailsPromises = user.inventory.map((slot, index) =>
                    axios.get<ItemDetails>(`http://localhost:8080/items/${slot.itemId}`).then(response => ({
                        ...slot,
                        ...response.data,
                        type: response.data.itemType.toLowerCase() as 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants', // Convert itemType to the correct union type
                        slotIndex: index  // Add slot index here
                    }))
                );

                const itemsWithDetails = await Promise.all(itemDetailsPromises);
                setItems(itemsWithDetails);
            };

            fetchItems();
        }
    }, [user]);

    const handleItemClick = (item: IInventorySlot & ItemDetails & { slotIndex: number }) => {
        if (item.itemId !== 0) {
            setSelectedItem(item);
        }
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleSell = async (item: IInventorySlot & ItemDetails & { slotIndex: number }) => {
        if (!user) return;
        try {
            const response = await axios.post('http://localhost:8080/profiles/sell-item', {
                userId: user._id,
                itemId: item.itemId,
                slotIndex: item.slotIndex,
            });

            setUser(response.data.user);
            setItems(prevItems => prevItems.filter(i => i.slotIndex !== item.slotIndex));
        } catch (error) {
            console.error('Failed to sell item:', error);
        }
    };

    const handleEquip = (item: IInventorySlot & ItemDetails & { slotIndex: number }, slotIndex: number) => {
        // Logic to handle equipping an item
        console.log(`Equipped ${item.itemName} to slot ${slotIndex}`);
        setSelectedItem(null); // Deselect item after equipping
    };

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div style={{ color: "white" }}>
            <h1>{user.profileNickname}'s Profile</h1>
            <p>Money: {user.money}</p>
            <p>Level: {user.level}</p>
            <p>Health Points: {user.healthPoints}</p>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                    <UserInventory onItemClick={handleItemClick} items={items} selectedItem={selectedItem} />
                    {selectedItem && (
                        <ItemDetailsModal
                            item={selectedItem}
                            onClose={handleCloseModal}
                            onSell={() => handleSell(selectedItem)}
                        />
                    )}
                </div>
                {user.solanaAddress && (
                    <HeroEquip selectedItem={selectedItem} onEquip={handleEquip} solanaAddress={user.solanaAddress} />
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
