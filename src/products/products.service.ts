import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/products.dto';
import { PrismaService } from './database/PrismaService';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductsDto) {
    const product = await this.prisma.product.create({
      data,
    });

    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }
}
