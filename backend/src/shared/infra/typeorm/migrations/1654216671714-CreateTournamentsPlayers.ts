import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTournamentsPlayers1654216671714
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tournamentsPlayers",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "position", type: "integer" },
          { name: "playerID", type: "uuid" },
          { name: "tournamentID", type: "uuid" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tournamentsPlayers");
  }
}
