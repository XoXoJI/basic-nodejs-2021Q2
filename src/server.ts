import { PORT } from './common/config';
import app from './app';
import { logger } from './common/logger';
import { connectToDB } from './common/db';

(async () => {
    try {
        await connectToDB();
    }
    catch(err) {
        logger.error(err);
    }

    app.listen(PORT, () =>
        logger.info(`App is running on http://localhost:${PORT}`)
    );
})();
