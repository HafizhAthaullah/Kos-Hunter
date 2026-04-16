import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) { }
  
  async findAll() {
    try {
      return await this.prisma.users.findMany({select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      }});
    } catch (error) {
      console.log(error);
      
    }
  }
 
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcrypt.hashPassword(createUserDto.password);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
