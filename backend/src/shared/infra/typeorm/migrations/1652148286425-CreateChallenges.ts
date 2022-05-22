import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChallenges1652148286425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "challenges",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "challengeePlayer", type: "Varchar" },
          { name: "challengedPlayer", type: "Varchar" },
          { name: "initialDate", type: "timestamp" },
          { name: "finalDate", type: "timestamp" },
          { name: "gameDate", type: "timestamp" },
          { name: "challengeeGiveup", type: "boolean" },
          { name: "challengedGiveup", type: "boolean" },
          { name: "refused", type: "boolean" },
          { name: "expired", type: "boolean" },
          { name: "challengeeFirstSet", type: "integer" },
          { name: "challengedFirstSet", type: "integer" },
          { name: "challengeeSecondSet", type: "integer" },
          { name: "challengedSecondSet", type: "integer" },
          { name: "challengeeTiebreak", type: "integer" },
          { name: "challengedTiebreak", type: "integer" },
          { name: "challengeePoints", type: "integer" },
          { name: "challengedPoints", type: "integer" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("challenges");
  }
}
