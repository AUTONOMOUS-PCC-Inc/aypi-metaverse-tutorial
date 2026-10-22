import { useRef, useState } from 'react';

export default function LoginOverlay({ onJoin, pending }) {
    const [name, setName] = useState('');
    const composing = useRef(false);
    const compositionEnded = useRef(0);
    const submit = (event) => {
        event.preventDefault();
        if (pending || composing.current || performance.now() - compositionEnded.current < 50) return;
        const trimmed = name.trim();
        if (trimmed) onJoin(trimmed);
    };

    return <div style={{ position: 'fixed', inset: 0, zIndex: 10000000, display: 'grid', placeItems: 'center', background: 'rgba(15, 23, 42, 0.8)' }}>
        <form onSubmit={submit} style={{ background: 'white', padding: 32, borderRadius: 16, width: 'min(320px, 80vw)', display: 'grid', gap: 16 }}>
            <h2 style={{ margin: 0 }}>이름을 입력하세요</h2>
            <input aria-label="이름" autoFocus value={name} disabled={pending}
                onChange={(event) => setName(event.target.value)}
                onCompositionStart={() => { composing.current = true; }}
                onCompositionEnd={() => { composing.current = false; compositionEnded.current = performance.now(); }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && (composing.current || event.nativeEvent.isComposing || event.keyCode === 229 || event.repeat)) event.preventDefault();
                }}
                style={{ padding: 12, fontSize: 16 }} />
            <button type="submit" disabled={pending || !name.trim()} style={{ padding: 12, fontSize: 16 }}>JOIN</button>
            {pending && <p role="status" style={{ margin: 0 }}>서버 연결 및 입장을 기다리는 중입니다.</p>}
        </form>
    </div>;
}
