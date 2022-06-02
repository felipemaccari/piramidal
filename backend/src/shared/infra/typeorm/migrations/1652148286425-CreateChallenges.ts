import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChallenges1652148286425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "challenges",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "initialDate", type: "timestamp" },
          { name: "finalDate", type: "timestamp" },
          { name: "originPlayerID", type: "uuid" },
          { name: "destinationPlayerID", type: "uuid" },
          { name: "tournamentID", type: "uuid" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("challenges");
  }
}
