import friendshipRouter from "./routes/friendship";
import express, {Express} from "express";
import cors from "cors";

require('dotenv').config()


const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 4000;

// Setting up the routes
app.use('/friendship', friendshipRouter);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
