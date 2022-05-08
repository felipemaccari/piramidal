import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "admin",
  password: "441332",
  database: "piramidal",
});

dataSource.initialize();
