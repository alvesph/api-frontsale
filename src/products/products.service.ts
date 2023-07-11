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

  async findType(type: string) {
    const productExists = await this.prisma.product.findMany({
      where: {
        type,
      },
    });
    if (!productExists) {
      throw new Error('Product does not exists');
    }

    return productExists;
  }

  async update(id: string, data: CreateProductsDto) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists');
    }

    return await this.prisma.product.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists');
    }

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
