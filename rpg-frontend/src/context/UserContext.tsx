import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface IInventoryItem {
    itemId: number;
    quantity: number;
    equipped: boolean;
    unlocked: boolean;
    type: 'armor' | 'helmet' | 'weapon' | 'ring' | 'pants';
}

export interface User {
    _id: string;
    profileNickname: string;
    solanaAddress?: string;
    profileClass: number;
    money: number;
    level: number;
    healthPoints: number;
    dungeonLevel: number;
    inventory: IInventoryItem[];
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUserData = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;
