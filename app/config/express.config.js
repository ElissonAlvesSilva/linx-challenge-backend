import express, { static } from 'express';
import { json, urlencoded } from 'body-parser';
import express_validator from 'express-validator';
import cors from 'cors';
import consign from 'consign';

const app = express();


app.use(json());
app.use(urlencoded({
    extended: false
}));
app.use(express_validator());
app.use(cors());
app.use('/static',static('app/public'));


consign({cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

const _app = app;

export { _app as app };