import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1652145165406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "Varchar" },
          { name: "email", type: "Varchar" },
          { name: "password", type: "Varchar" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
