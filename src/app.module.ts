import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entity/product.entity';
import { Category } from './category/entity/category.entity';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      entities: [Product, Category, User],
      synchronize: true,
      logging: true,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
