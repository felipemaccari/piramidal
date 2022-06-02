import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

const FKChallengeTournament = new TableForeignKey({
  name: "FK_Challenge_Tournament",
  columnNames: ["tournamentID"],
  referencedColumnNames: ["id"],
  referencedTableName: "tournaments",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const FKChallengeOriginPlayer = new TableForeignKey({
  name: "FK_Challenge_Origin_Player",
  columnNames: ["originPlayerID"],
  referencedColumnNames: ["id"],
  referencedTableName: "players",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const FKChallengeDestinationPlayer = new TableForeignKey({
  name: "FK_Challenge_Destination_Player",
  columnNames: ["destinationPlayerID"],
  referencedColumnNames: ["id"],
  referencedTableName: "players",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

export class AddChallengesForeignKeys1654126793811
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey("challenges", FKChallengeTournament);

    await queryRunner.createForeignKey("challenges", FKChallengeOriginPlayer);

    await queryRunner.createForeignKey(
      "challenges",
      FKChallengeDestinationPlayer
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("challenges", [
      FKChallengeTournament,
      FKChallengeOriginPlayer,
      FKChallengeDestinationPlayer,
    ]);
  }
}
