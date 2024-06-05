import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import UserInventory from "../components/UserInventory";

const UserProfilePage = () => {
    const { user, setUser } = useUser();  // Get setUser from context

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [setUser]);

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div>
            <h1>{user.nickname}'s Profile</h1>
            <UserInventory />
        </div>
    );
};

export default UserProfilePage;
