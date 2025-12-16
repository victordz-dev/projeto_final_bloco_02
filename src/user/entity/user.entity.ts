import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'O email deve ser válido' })
  @Column({ length: 255, nullable: false, unique: true })
  email!: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Column({ length: 255, nullable: false, select: false })
  password!: string;

  @IsOptional()
  @Column({ length: 5000, nullable: true })
  photo?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
