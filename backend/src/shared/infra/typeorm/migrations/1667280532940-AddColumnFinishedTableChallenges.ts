import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFinishedTableChallenges1667280532940
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "challenges",
      new TableColumn({
        name: "finished",
        type: "boolean",
        default: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("challenges", "finished");
  }
}
