import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreatePlayerActive1665873705382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "active",
        type: "boolean",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "active");
  }
}
