import { Server } from 'socket.io';

const io = new Server(3001, {
    cors: {
        // LAN 주소로 연 Vite 화면도 허용한다. 개발 화면의 포트는 5173으로 고정한다.
        origin: /^https?:\/\/[^/]+:5173$/,
        methods: ['GET', 'POST'],
    },
});

const characters = [];
const broadcast = () => io.emit('characters', characters);
const animationNames = new Set(['Idle', 'Walk', 'Run', 'Fast Run', 'Jump']);

io.on('connection', (socket) => {
    console.log('접속:', socket.id);
    socket.on('join', (name) => {
        if (typeof name !== 'string' || !name.trim()) return;
        name = name.trim();
        const existing = characters.find((character) => character.key === socket.id);
        if (existing) existing.name = name;
        else characters.push({
            key: socket.id, name, animationName: 'Idle',
            position: [2, -1, 0], rotationY: 0, talk: '',
        });
        broadcast();
    });
    socket.on('update', (state) => {
        console.log(`update ${socket.id} ${JSON.stringify(state)}`);
        const character = characters.find((entry) => entry.key === socket.id);
        if (!character || !state || !animationNames.has(state.animationName) ||
            !Array.isArray(state.position) || state.position.length !== 3 ||
            !state.position.every(Number.isFinite) || !Number.isFinite(state.rotationY)) return;
        if (state.position.some((value, index) => value !== character.position[index])) character.talk = '';
        character.animationName = state.animationName;
        character.position = [...state.position];
        character.rotationY = state.rotationY;
        broadcast();
    });
    socket.on('talk', (message) => {
        const character = characters.find((entry) => entry.key === socket.id);
        if (!character || typeof message !== 'string') return;
        character.talk = message;
        broadcast();
    });
    socket.on('disconnect', () => {
        console.log('종료:', socket.id);
        const index = characters.findIndex((character) => character.key === socket.id);
        if (index !== -1) characters.splice(index, 1);
        broadcast();
    });
});

console.log('Socket.IO 서버: 포트 3001 (모든 네트워크 인터페이스)');
