import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../../category/service/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async checkProduct(id: number): Promise<boolean> {
    const find = await this.productRepository.exists({
      where: { id },
    });
    if (!find) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async findProductByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        category: true,
      },
    });
  }

  async findProductByCategory(categoryId: number): Promise<Product[]> {
    await this.categoryService.checkCategory(categoryId);
    return await this.productRepository.find({
      where: {
        category: { id: categoryId },
      },
      relations: {
        category: true,
      },
    });
  }

  async createProduct(product: Product): Promise<Product> {
    await this.categoryService.checkCategory(product.category.id);
    return await this.productRepository.save(product);
  }

  async updateProduct(product: Product): Promise<Product> {
    await this.checkProduct(product.id);
    await this.categoryService.checkCategory(product.category.id);
    await this.productRepository.update(product.id, product);
    return this.findProductById(product.id);
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    await this.checkProduct(id);
    return await this.productRepository.delete(id);
  }
}
