import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

interface Stat {
    type: string;
    value: number;
}

interface Enemy {
    _id: string;
    enemyName: string;
    enemyLevel: number;
    enemyCost: number;
    enemyFightDuration: number;
    enemyStats: Stat[];
    baseMoneyReward: number;
    baseExpReward: number;
    imageUrl: string;
}

const DungeonComponent: React.FC = () => {
    const { user, setUser } = useUser();
    const [enemies, setEnemies] = useState<Enemy[]>([]);

    useEffect(() => {
        const fetchEnemies = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/enemies/level/${user.dungeonLevel}`);
                    console.log('Fetched enemies:', response.data.enemies);
                    setEnemies(response.data.enemies);
                } catch (error) {
                    console.error('Failed to fetch enemies:', error);
                }
            }
        };

        fetchEnemies();
    }, [user]);

    const handleFight = async (enemyId: string) => {
        if (user) {
            try {
                const response = await axios.post('http://localhost:8080/fights', {
                    userId: user._id,
                    enemyId: enemyId
                });
                console.log('Fight result:', response.data);

                setUser(response.data.user);
            } catch (error) {
                console.error('Failed to fight enemy:', error);
            }
        }
    };


    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div>
            <h1 style={{color: "white"}} >Dungeon</h1>
            {enemies.length === 0 ? (
                <p>No enemies found.</p>
            ) : (
                enemies.map((enemy) => (
                    <div style={{color: "white"}} key={enemy._id}>
                        <h3>{enemy.enemyName}</h3>
                        <p>Level: {enemy.enemyLevel}</p>
                        <p>Cost: {enemy.enemyCost}</p>
                        <p>Fight Duration: {enemy.enemyFightDuration}s</p>
                        <p>Stats:</p>
                        <ul>
                            {enemy.enemyStats.map((stat: Stat, index: number) => (
                                <li key={index}>{`${stat.type}: ${stat.value}`}</li>
                            ))}
                        </ul>
                        <p>Base Money Reward: {enemy.baseMoneyReward}</p>
                        <p>Base Experience Reward: {enemy.baseExpReward}</p>
                        <button onClick={() => handleFight(enemy._id)}>Fight</button>
                        <img src={enemy.imageUrl} alt={enemy.enemyName} style={{ width: '100px', height: '100px' }} />
                    </div>
                ))
            )}
        </div>
    );
};

export default DungeonComponent;