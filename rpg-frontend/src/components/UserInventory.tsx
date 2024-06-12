import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

interface IInventorySlot {
    itemId: number;
    quantity: number;
    equipped: boolean;
    unlocked: boolean;
}

interface ItemDetails {
    itemName: string;
    itemType: string;
    rarity: string;
    price: number;
    sellDuration: number;
    bonusStats: {
        dmg: number;
        spd: number;
        crt: number;
        mna: number;
    };
    stackable: boolean;
    imageUrl: string;
}

const UserInventory: React.FC = () => {
    const { user } = useUser();
    const [items, setItems] = useState<(IInventorySlot & ItemDetails)[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            if (user && user.inventory) {
                const itemDetailsPromises = user.inventory.map(slot =>
                    axios.get<ItemDetails>(`http://localhost:8080/items/${slot.itemId}`).then(response => ({
                        ...slot,
                        ...response.data
                    }))
                );

                const itemsWithDetails = await Promise.all(itemDetailsPromises);
                setItems(itemsWithDetails);
            }
        };

        fetchItems();
    }, [user]);

    if (!user) {
        return <p>No user data available. Please log in.</p>;
    }

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxWidth: '600px' }}>
                {items.map((item, index) => (
                    <div key={index} style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '5px',
                        backgroundColor: item.unlocked ? '#fff' : '#eee',
                        color: item.unlocked ? '#000' : '#777',
                        textAlign: 'center',
                    }}>
                        <h3>{item.itemId ? `Item: ${item.itemName}` : 'Empty Slot'}</h3>
                        <img src={item.imageUrl} alt={`Item ${item.itemId}`} style={{ width: '100px', height: '100px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInventory;
