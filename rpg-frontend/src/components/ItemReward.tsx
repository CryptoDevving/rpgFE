import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const ItemReward: React.FC = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const giveItem = async () => {
        if (!user) {
            alert('Please log in to receive an item.');
            return;
        }

        setLoading(true);

        // Randomly choose between item ID 1 and item ID 2
        const itemId = Math.random() < 0.5 ? 1 : 2;

        setTimeout(async () => {
            try {
                const response = await axios.post('http://localhost:8080/profiles/giveItem', {
                    userId: user._id,
                    itemId: itemId,
                });

                if (response.data.success) {
                    setUser(response.data.updatedUser);
                } else {
                    alert('Failed to receive item: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error giving item:', error);
                alert('Error giving item.');
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div>
            <button onClick={giveItem} disabled={loading}>
                {loading ? 'Waiting...' : 'Receive Item'}
            </button>
        </div>
    );
};

export default ItemReward;
