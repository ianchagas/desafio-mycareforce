import { UserRole } from '@app/shared/enum/userRole.enum';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UsuariosEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'uuid',
    type: 'uuid',
    generated: 'uuid',
  })
  uuid: string;

  @Column({
    nullable: false,
  })
  nome: string;

  @Column({
    nullable: false,
  })
  sobrenome: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: UserRole,
    default: UserRole.PROFISSIONAL,
  })
  role: UserRole;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    name: 'is_banned',
    nullable: false,
    default: false,
  })
  isBanned: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
