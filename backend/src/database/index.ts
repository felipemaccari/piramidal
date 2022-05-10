import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "admin",
  password: "441332",
  database: "piramidal",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: ["./src/database/migrations/{*.ts}"],
  subscribers: [],
});