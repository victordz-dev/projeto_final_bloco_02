import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
