import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { ProductService } from '../service/product.service';
import { DeleteResult } from 'typeorm';

@Controller('/produtos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllProduct(): Promise<Product[]> {
    return this.productService.findAllProduct();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Get('/nome/:name')
  @HttpCode(HttpStatus.OK)
  async findProductByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findProductByName(name);
  }

  @Get('/categoria/:categoryId')
  @HttpCode(HttpStatus.OK)
  async findProductByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[]> {
    return this.productService.findProductByCategory(categoryId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Body() product: Product): Promise<Product> {
    return this.productService.updateProduct(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }
}
