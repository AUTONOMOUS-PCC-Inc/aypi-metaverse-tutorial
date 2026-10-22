import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function ServerConnector({ name, onSessionChange }) {
    useEffect(() => {
        const serverUrl = new URL(window.location.origin);
        serverUrl.port = '3001';
        const socket = io(serverUrl.origin, { autoConnect: false });
        const onConnect = () => {
            console.log('connected');
            onSessionChange({ socket, id: socket.id, characters: [] });
            socket.emit('join', name);
        };
        const onCharacters = (characters) => {
            onSessionChange((previous) => ({ ...previous, characters }));
        };
        const onDisconnect = () => onSessionChange({ socket: null, id: null, characters: [] });
        socket.on('connect', onConnect);
        socket.on('characters', onCharacters);
        socket.on('disconnect', onDisconnect);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('characters', onCharacters);
            socket.off('disconnect', onDisconnect);
            socket.disconnect();
        };
    }, [name, onSessionChange]);

    return null;
}
