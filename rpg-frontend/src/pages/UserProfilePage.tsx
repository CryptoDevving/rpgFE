import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInventory from '../components/UserInventory';
import ItemDetailsShow from '../components/ItemDetailsShow';
import { useUser, User } from '../context/UserContext';
import { IInventorySlot, ItemDetails } from '../context/types';
import HeroEquip from '../components/HeroEquip';
import {useNavigate} from "react-router-dom";
import RedButton from "../components/RedButton";

const UserProfilePage: React.FC = () => {
    const { user, setUser } = useUser();
    const [items, setItems] = useState<(IInventorySlot & ItemDetails & { slotIndex: number })[]>([]);
    const [selectedItem, setSelectedItem] = useState<(IInventorySlot & ItemDetails & { slotIndex: number }) | null>(null);
    const [equippedItems, setEquippedItems] = useState<any[]>([]);
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
                        type: response.data.itemType.toLowerCase() as 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants',
                        slotIndex: index
                    }))
                );

                const itemsWithDetails = await Promise.all(itemDetailsPromises);
                setItems(itemsWithDetails);
            };

            fetchItems();
        }
    }, [user]);

    useEffect(() => {
        const fetchEquippedItems = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/heroequipment/equipped-items/${user.solanaAddress}`);
                    setEquippedItems(response.data);
                } catch (error) {
                    console.error('Failed to fetch equipped items:', error);
                }
            }
        };

        fetchEquippedItems();
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

    const handleEquip = async (item: IInventorySlot & ItemDetails & { slotIndex: number }) => {
        if (!user) return;
        try {
            const response = await axios.post('http://localhost:8080/heroequipment/equip', {
                solanaAddress: user.solanaAddress,
                itemId: item.itemId,
                type: item.type,
            });

            const updatedUser = response.data.user as User;
            setUser({
                ...updatedUser,
                inventory: updatedUser.inventory,
            });
            setEquippedItems(response.data.equippedItems); // Update the equipped items state
            setSelectedItem(null); // Deselect item after equipping
        } catch (error) {
            console.error('Failed to equip item:', error);
        }
    };

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div className="user-profile-page">
            <div className="user-inventory">
                <UserInventory onItemClick={handleItemClick} items={items} selectedItem={selectedItem} />
            </div>
            <div style={{ textAlign: 'center', marginTop: 780, marginLeft: -380 }}>
                <RedButton text="Go to Map" onClick={navigateToMap} />
            </div>

            <div className="item-details-modal">
                {selectedItem && (
                    <ItemDetailsShow
                        item={selectedItem}
                        onClose={handleCloseModal}
                        onSell={() => handleSell(selectedItem)}
                        onEquip={() => handleEquip(selectedItem)}
                        buttonShow="equip"
                    />
                )}
            </div>

            <div className="hero-equip">
                {user.solanaAddress && (
                    <HeroEquip
                        selectedItem={selectedItem}
                        onEquip={handleEquip}
                        solanaAddress={user.solanaAddress}
                        equippedItems={equippedItems}
                    />
                )}
            </div>

        </div>
    );
};

export default UserProfilePage;