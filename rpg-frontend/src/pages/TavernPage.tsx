import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInventory from '../components/UserInventory';
import Merchant from '../components/MerchantComponent';
import ItemDetailsModal from '../components/ItemDetailsModal';
import { useUser } from '../context/UserContext';
import { IInventorySlot, ItemDetails } from '../context/types';
import {useNavigate} from "react-router-dom";
import RedButton from "../components/RedButton"; // Adjust the import path

const TavernPage: React.FC = () => {
    const { user, setUser } = useUser();
    const [items, setItems] = useState<(IInventorySlot & ItemDetails & { slotIndex: number })[]>([]);
    const [selectedItem, setSelectedItem] = useState<(IInventorySlot & ItemDetails & { slotIndex: number }) | null>(null);
    const navigate = useNavigate();

    const navigateToMap = () => {
        navigate('/map');
    };

    useEffect(() => {
        if (user && user.inventory) {
            const fetchItems = async () => {
                const itemDetailsPromises = user.inventory.map((slot, index) =>
                    axios.get<ItemDetails>(`http://localhost:8080/items/${slot.itemId}`).then(response => ({
                        ...slot,
                        ...response.data,
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

    const handleItemSold = () => {
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

    const handleEquip = async (item: IInventorySlot & ItemDetails & { slotIndex: number }) => {
        if (!user) return;
        try {
            const response = await axios.post('http://localhost:8080/heroequipment/equip', {
                solanaAddress: user.solanaAddress,
                itemId: item.itemId,
                type: item.type,
            });

            const updatedUser = response.data.user;
            setUser(updatedUser);
            setSelectedItem(null);
        } catch (error) {
            console.error('Failed to equip item:', error);
        }
    };

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <UserInventory onItemClick={handleItemClick} items={items} selectedItem={selectedItem} />
            </div>

            <div style={{ marginTop: '780px', marginLeft: -440, textAlign: 'center' }}>
                <RedButton text="Go to Map" onClick={navigateToMap} />
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {selectedItem && (
                    <ItemDetailsModal
                        item={selectedItem}
                        onClose={handleCloseModal}
                        onSell={() => handleSell(selectedItem)}
                        onEquip={() => handleEquip(selectedItem)}
                        buttonShow="sell"  // Show equip button

                    />
                )}
            </div>
            <div style={{ marginRight:300}}>
                <Merchant selectedItem={selectedItem} onItemSold={handleItemSold} />
            </div>
        </div>
    );
};

export default TavernPage;
