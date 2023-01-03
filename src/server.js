import express from 'express'
import fileUpload from 'express-fileupload';
import eventsRouter from './router/events.router.js'
import adminsRouter from './router/admins.router.js'
import PORT from './config.js';
import swaggerRouter from './swagger.js'

const app = express();
app.use( express.json() );
app.use(fileUpload())

app.use( eventsRouter )
app.use( adminsRouter )
app.use( swaggerRouter )

app.listen(PORT, () => console.log('server ready'))