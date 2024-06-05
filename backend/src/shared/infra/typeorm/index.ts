import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "piramidal-database.internal",
  port: 5432,
  username: "postgres",
  password: "NNYzwA0gVtbaDgk",
  database: "piramidal",
  synchronize: true,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource;
