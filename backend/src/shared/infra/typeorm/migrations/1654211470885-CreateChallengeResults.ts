import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChallengeResults1654211470885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "challengesResults",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
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
          { name: "challengeID", type: "uuid" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("challengesResults");
  }
}
