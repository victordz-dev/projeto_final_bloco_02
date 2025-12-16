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
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';
import { DeleteResult } from 'typeorm';

@Controller('/categoria')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllCategory(): Promise<Category[]> {
    return this.categoryService.findAllCategory();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findCategoryByName(@Param('name') name: string): Promise<Category[]> {
    return this.categoryService.findCategoryByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.updateCategory(category);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(id);
  }
}
