import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('../frontend/dist'))

// const port = process.env.PORT || 4000;
const port = 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
