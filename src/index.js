import { initMongoConnection } from './db/initMongoDBConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
    await initMongoConnection();
    startServer();
};

bootstrap();