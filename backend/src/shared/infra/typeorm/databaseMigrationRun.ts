import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "441332",
  database: "piramidal",
  synchronize: true,
  logging: false,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/{*.ts}"],
  subscribers: [],
});

export default AppDataSource;
