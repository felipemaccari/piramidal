import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTournaments1652146000595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tournaments",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "description", type: "Varchar" },
          { name: "initialDate", type: "timestamp" },
          { name: "finalDate", type: "timestamp" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tournaments");
  }
}
