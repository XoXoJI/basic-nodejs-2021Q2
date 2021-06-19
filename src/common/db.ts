import { createConnection, getConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import ormconfig from "./ormconfig";

export async function connectToDB() {
    let connection = getConnection();

    if(connection) {
        if(!connection.isConnected) {
            connection.connect();
        }
    }
    else {
        connection = await createConnection(ormconfig as PostgresConnectionOptions);
    }
}
