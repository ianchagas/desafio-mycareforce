import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultUserAdmin1724097619298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO usuarios (nome, sobrenome, email, role, password, is_banned, created_at, updated_at)
            VALUES (
                'Admin', 
                'Principal', 
                'admin@mycareforce.com', 
                'ADMIN', 
                '$2a$10$7oBqzIOp5smXuckYhorPnu.BwLc0RN.dINNQMGiwfnpXYTGQ5mZxS', 
                false, 
                now(), 
                now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM usuarios
        WHERE email = 'admin@mycareforce.com';
    `);
  }
}
