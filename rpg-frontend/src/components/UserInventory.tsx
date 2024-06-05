import React from 'react';
import { useUser} from "../context/UserContext";

const UserInventory: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <p>No user data available. Please log in.</p>;
    }

    return (
        <div>
            <h1>{user.nickname}'s Inventory</h1>
            <h1>{user.money}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxWidth: '600px' }}>
                {user.inventory.map((item, index) => (
                    <div key={index} style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '5px',
                        // width: '20px',
                        // height: '20px',
                        backgroundColor: item.unlocked ? '#fff' : '#eee',
                        color: item.unlocked ? '#000' : '#777',
                        textAlign: 'center',
                    }}>
                        <h3>{item.itemId ? `Item ID: ${item.itemId}` : 'Empty Slot'}</h3>
                        {/*{item.imageUrl && <img src={item.imageUrl} alt={`Item ${item.itemId}`} style={{ width: '100px', height: '100px' }} />}*/}

                        {/*<p>Quantity: {item.quantity}</p>*/}
                        {/*<p>{item.equipped ? 'Equipped' : 'Not Equipped'}</p>*/}
                        {/*<p>{item.unlocked ? 'Unlocked' : 'Locked'}</p>*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInventory;
