import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import Modal from 'react-modal';

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
    const [isFighting, setIsFighting] = useState(false);
    const [fightProgress, setFightProgress] = useState(0);
    const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        if (user && selectedEnemy) {
            setIsFighting(true);
            setFightProgress(0);
            const fightDuration = selectedEnemy.enemyFightDuration;
            const interval = 100; // Update the progress bar every 100ms
            const totalIntervals = fightDuration * 1000 / interval;
            let currentInterval = 0;

            const fightInterval = setInterval(() => {
                currentInterval++;
                setFightProgress((currentInterval / totalIntervals) * 100);

                if (currentInterval >= totalIntervals) {
                    clearInterval(fightInterval);
                    completeFight(enemyId);
                }
            }, interval);
        }
    };

    const completeFight = async (enemyId: string) => {
        try {
            const response = await axios.post('http://localhost:8080/fights', {
                userId: user!._id,
                enemyId: enemyId
            });
            console.log('Fight result:', response.data);
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to fight enemy:', error);
        } finally {
            setIsFighting(false);
            setFightProgress(0);
            setModalIsOpen(false);
        }
    };

    const openModal = (enemy: Enemy) => {
        setSelectedEnemy(enemy);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div>
            <h1 style={{ color: "white" }}>Dungeon</h1>
            {enemies.length === 0 ? (
                <p>No enemies found.</p>
            ) : (
                enemies.map((enemy) => (
                    <div style={{ color: "white" }} key={enemy._id}>
                        <h3>{enemy.enemyName}</h3>
                        {/*<p>Level: {enemy.enemyLevel}</p>*/}
                        <p>Cost: {enemy.enemyCost}</p>
                        <p>Fight Duration: {enemy.enemyFightDuration}s</p>
                        {/*<p>Base Money Reward: {enemy.baseMoneyReward}</p>*/}
                        {/*<p>Base Experience Reward: {enemy.baseExpReward}</p>*/}
                        <button
                            onClick={() => openModal(enemy)}
                            disabled={isFighting || user.money < enemy.enemyCost}
                        >
                            {user.money < enemy.enemyCost ? 'Not Enough Money' : 'Fight'}
                        </button>
                        <img src={enemy.imageUrl} alt={enemy.enemyName} style={{ width: '100px', height: '100px' }} />
                    </div>
                ))
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedEnemy && (
                    <div>
                        <h2>{selectedEnemy.enemyName}</h2>
                        <p>Level: {selectedEnemy.enemyLevel}</p>
                        <p>Cost: {selectedEnemy.enemyCost}</p>
                        <p>Fight Duration: {selectedEnemy.enemyFightDuration}s</p>
                        <p>Stats:</p>
                        <ul>
                            {selectedEnemy.enemyStats.map((stat, index) => (
                                <li key={index}>{`${stat.type}: ${stat.value}`}</li>
                            ))}
                        </ul>
                        <p>Base Money Reward: {selectedEnemy.baseMoneyReward}</p>
                        <p>Base Experience Reward: {selectedEnemy.baseExpReward}</p>
                        <button
                            onClick={() => handleFight(selectedEnemy._id)}
                            disabled={isFighting || user.money < selectedEnemy.enemyCost}
                        >
                            {user.money < selectedEnemy.enemyCost ? 'Not Enough Money' : 'Start Fight'}
                        </button>
                        {isFighting && (
                            <div>
                                <p>Fighting...</p>
                                <div style={{ width: '100%', backgroundColor: '#ccc' }}>
                                    <div style={{
                                        width: `${fightProgress}%`,
                                        height: '30px',
                                        backgroundColor: '#4caf50'
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default DungeonComponent;
