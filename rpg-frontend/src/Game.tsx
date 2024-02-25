// src/Game.tsx
import Phaser from 'phaser';
import React, { useEffect, useRef } from 'react';

const Game: React.FC = () => {
    const phaserGameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: phaserGameRef.current!,
            width: 800,
            height: 600,
            scene: {
                preload: function(this: Phaser.Scene) {
                    // Load any assets here if necessary
                },
                create: function(this: Phaser.Scene) {
                    // Add text to the scene
                    const draggableText = this.add.text(100, 100, 'Drag me', {
                        fontSize: '32px',
                        color: '#000',
                        backgroundColor: '#fff',
                        padding: { x: 10, y: 5 },
                        // border: { size: 1, color: 'red' }
                    });

                    // Make the text interactable and draggable
                    draggableText.setInteractive({ useHandCursor: true });
                    this.input.setDraggable(draggableText);

                    // When the drag starts
                    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text) => {
                        gameObject.setStyle({ color: '#ff0' }); // Change text color on drag start
                    });

                    // When dragging
                    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text, dragX: number, dragY: number) => {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    });

                    // When the drag ends
                    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text) => {
                        gameObject.setStyle({ color: '#000' }); // Change text color back on drag end
                    });
                }
            }
        };

        new Phaser.Game(config);

        // Cleanup game instance on component unmount
        return () => {
            phaserGameRef.current?.childNodes.forEach((child) => {
                if (child instanceof HTMLCanvasElement) {
                    child.remove();
                }
            });
        };
    }, []);

    return <div ref={phaserGameRef} />;
};

export default Game;
