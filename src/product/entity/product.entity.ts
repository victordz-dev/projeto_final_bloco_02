import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entity/category.entity';

@Entity({ name: 'tb_product' })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  name!: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  stock!: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Column({ type: 'date', nullable: false })
  validUntil!: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category!: Category;
}
