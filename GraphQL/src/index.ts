import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { DataSource, createConnection } from "typeorm";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";


const main = async () => {

    await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'graphqlcrud',
        entities: [Users],
        synchronize: false,
        logging: false,
    })

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(3001, () => {
        console.log("SERVER IS RUNNING ON PORT 3001");
    })

}

main().catch((err) => {
    console.log(err);
})