import { useRef, useState } from 'react';

export default function TalkOverlay({ socket }) {
    const [message, setMessage] = useState('');
    const composing = useRef(false);
    const compositionEnded = useRef(0);
    const send = () => {
        if (composing.current || !socket?.connected) return;
        const text = message.trim();
        if (!text) return;
        socket.emit('talk', text);
        setMessage('');
    };

    return <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10000000, display: 'flex', gap: 8, width: 'min(560px, 90vw)', padding: 12, borderRadius: 12, background: 'rgba(20, 28, 40, 0.9)' }}>
        <input aria-label="채팅 메시지" placeholder="메시지 입력 후 Enter" value={message}
            onChange={(event) => setMessage(event.target.value)}
            onCompositionStart={() => { composing.current = true; }}
            onCompositionEnd={() => { composing.current = false; compositionEnded.current = performance.now(); }}
            onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229 || event.repeat || performance.now() - compositionEnded.current < 50) return;
                send();
            }}
            style={{ flex: 1, minWidth: 0, padding: 12, fontSize: 16, borderRadius: 6 }} />
        <button type="button" onClick={send} disabled={!message.trim()} style={{ padding: '0 16px' }}>전송</button>
    </div>;
}
