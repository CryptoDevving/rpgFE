import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the user data you want to store

interface IInventoryItem {
    itemId: number;
    quantity: number;
    equipped: boolean;
    unlocked: boolean;
}

interface User {
    nickname: string;
    solanaAddress?: string;
    profileClass: number;
    money: number;
    level: number;
    healthPoints: number;
    inventory: IInventoryItem[];
}

// Define the context type
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(() => {
        // Example: Attempt to load user data from local storage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;
