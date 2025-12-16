import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkUser(id: number): Promise<boolean> {
    const find = await this.userRepository.exists({
      where: { id },
    });
    if (!find) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByName(name: string): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async createUser(user: User): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: { name: user.name },
    });
    if (userExist) {
      throw new HttpException('Usuário já existe!', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    await this.checkUser(user.id);
    await this.userRepository.update(user.id, user);
    return this.findUserById(user.id);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    await this.checkUser(id);
    return this.userRepository.delete(id);
  }
}
