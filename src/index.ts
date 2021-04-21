import * as express from "express";
import * as cors from 'cors';

import dataRoute from './routes/data';
import computerRoute from './routes/computer';

const app = express();

app.use('/data', dataRoute);
app.use('/computer', cors(), computerRoute);

app.all("/", (req, res) => res.json({ message: "Welcome to Maxi's webhook service" }));

app.listen(process.env.PORT, () => console.log(`Webhook-Service listening on port ${process.env.PORT}`));
