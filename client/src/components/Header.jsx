// src/components/Header.jsx
function Header() {
    const learnerName = "Minh Nguyen";
    const streakDays = 8;

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--primary)' }}>
                BrainSpace
            </div>

            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Học viên: <strong style={{ color: 'var(--text-main)' }}>{learnerName}</strong> | Chuỗi học: <span style={{ color: 'var(--accent-warning)', fontWeight: 'bold' }}>{streakDays} ngày 🔥</span>
            </div>
        </header>
    );
}

export default Header;