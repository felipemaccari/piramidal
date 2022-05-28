import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlayers1652143835560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "players",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "Varchar" },
          { name: "phone", type: "Varchar" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("players");
  }
}
