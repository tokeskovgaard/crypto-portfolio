import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(history());
app.use(express.static('../frontend/dist'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
