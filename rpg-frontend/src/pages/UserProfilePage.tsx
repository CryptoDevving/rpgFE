import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import UserInventory from "../components/UserInventory";
import ItemReward from "../components/ItemReward";

const UserProfilePage: React.FC = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        console.log("Saved user data from localStorage:", savedUser); // Debugging
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, [setUser]);

    useEffect(() => {
        console.log("Current user data in UserProfilePage:", user); // Debugging
    }, [user]);

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div style={{color: "white"}}>
            <h1>{user.profileNickname}'s Profile</h1>
            <p>Money: {user.money}</p>
            <p>Level: {user.level}</p>
            <p>Health Points: {user.healthPoints}</p>
<ItemReward/>
            <UserInventory/>
        </div>
    );
};

export default UserProfilePage;
