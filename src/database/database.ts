import path from 'path';
import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigFile } from '../models/config';

let Config: ConfigFile = require('../../config/config.json');

type SupportedDatabase =
    | 'mysql'
    | 'mariadb'
    | 'postgres'
    | 'sqlite'
    | 'mssql'
    | 'oracle'
    | 'mongodb';

export class Database {
    public static async connect(): Promise<Connection> {
        return await createConnection({
            type: Config.database.type as SupportedDatabase,
            host: Config.database.host,
            port: Config.database.port,
            database: Config.database.database,
            username: Config.database.username,
            password: Config.database.password,
            entities: [path.join(__dirname, './entities/**/*{.ts,.js}')],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
        });
    }
}
