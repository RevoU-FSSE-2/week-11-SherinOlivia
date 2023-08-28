import express, {Request, Response} from 'express';
import 'dotenv/config';
import { DBLocal } from './config/dbConnection';
import insertAdmin from './config/adminConfig';
import router from './router/mainRouter';

const app = express()
const port = process.env.PORT;

app.use(express.json())

// DB Connection (Railway)
// DB.connect( function () {
//     if (DB) {
//         console.log("Railway Connection Succeed");
//     } else {
//         console.log("Railway Connection Failed");
//     }
// }),

// DB Connection (Local)
DBLocal.connect( function () {
    if (DBLocal) {
        console.log("Localhost Connection Succeed");
    } else {
        console.log("Localhost Connection Failed");
    }
})

// insert Super User / Admin account to Database.. (One time Use)
insertAdmin();

// router
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port:${port}`)
})