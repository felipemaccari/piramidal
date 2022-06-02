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
          { name: "gameDate", type: "timestamp" },
          { name: "originPlayerGiveup", type: "boolean" },
          { name: "destinationPlayerGiveup", type: "boolean" },
          { name: "refused", type: "boolean" },
          { name: "expired", type: "boolean" },
          { name: "originPlayerFirstSet", type: "integer" },
          { name: "destinationPlayerFirstSet", type: "integer" },
          { name: "originPlayerSecondSet", type: "integer" },
          { name: "destinationPlayerSecondSet", type: "integer" },
          { name: "originPlayerTiebreak", type: "integer" },
          { name: "destinationPlayerTiebreak", type: "integer" },
          { name: "originPlayerPoints", type: "integer" },
          { name: "destinationPlayerPoints", type: "integer" },
          { name: "originPlayerPlayerID", type: "uuid" },
          { name: "destinationPlayerPlayerID", type: "uuid" },
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
