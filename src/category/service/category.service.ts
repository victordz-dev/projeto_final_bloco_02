import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async checkCategory(id: number): Promise<boolean> {
    const find = await this.categoryRepository.exists({
      where: { id },
    });
    if (!find) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async findCategoryByName(name: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async createCategory(category: Category): Promise<Category> {
    const categoryExist = await this.categoryRepository.findOne({
      where: { name: category.name },
    });
    if (categoryExist) {
      throw new HttpException('Categoria já existe!', HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepository.save(category);
  }

  async updateCategory(category: Category): Promise<Category> {
    await this.checkCategory(category.id);
    await this.categoryRepository.update(category.id, category);
    return this.findCategoryById(category.id);
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    await this.checkCategory(id);
    return this.categoryRepository.delete(id);
  }
}
