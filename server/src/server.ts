// server/src/server.ts
import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 BrainSpace Backend đang chạy tại: http://localhost:${PORT}/api/v1`);
});