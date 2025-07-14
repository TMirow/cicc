import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1752222117469 implements MigrationInterface {
    name = 'InitSchema1752222117469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "element_state" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c9a30c02836d8d6ea734a26cb70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "element_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e18bcbf4b5557114442c489d2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "element" ("id" SERIAL NOT NULL, "atomicNumber" integer NOT NULL, "symbol" character varying NOT NULL, "name" character varying NOT NULL, "atomicMass" double precision NOT NULL, "boilingPoint" double precision NOT NULL, "meltingPoint" double precision NOT NULL, "electroNegativity" double precision NOT NULL, "density" double precision NOT NULL, "discovered" character varying NOT NULL, "oxidationStates" character varying NOT NULL, "group" double precision NOT NULL, "period" integer NOT NULL, "stateId" integer, "categoryId" integer, CONSTRAINT "PK_6c5f203479270d39efaad8cd82b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "element" ADD CONSTRAINT "FK_bb8751f6abcb440db04731a841e" FOREIGN KEY ("stateId") REFERENCES "element_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "element" ADD CONSTRAINT "FK_22a2edf440ce737c1b9a9f878c0" FOREIGN KEY ("categoryId") REFERENCES "element_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "element" DROP CONSTRAINT "FK_22a2edf440ce737c1b9a9f878c0"`);
        await queryRunner.query(`ALTER TABLE "element" DROP CONSTRAINT "FK_bb8751f6abcb440db04731a841e"`);
        await queryRunner.query(`DROP TABLE "element"`);
        await queryRunner.query(`DROP TABLE "element_category"`);
        await queryRunner.query(`DROP TABLE "element_state"`);
    }

}
