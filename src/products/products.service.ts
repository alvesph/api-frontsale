import { Injectable, Logger } from '@nestjs/common';
import { CreateProductsDto } from './dto/products.dto';
import { PrismaService } from './database/PrismaService';

@Injectable()
export class ProductsService {
  logger: Logger;

  constructor(private prisma: PrismaService) {
    this.logger = new Logger();
  }

  async create(data: CreateProductsDto) {
    try {
      const product = await this.prisma.product.create({
        data,
      });

      this.logger.log(JSON.stringify(product));
      return product;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany();
      const productLog = products.map((product) => {
        return {
          id: product.id,
          type: product.type,
          description: product.description,
        };
      });
      this.logger.log(JSON.stringify(productLog));
      return products;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findType(type: string) {
    try {
      const productExists = await this.prisma.product.findMany({
        where: {
          type,
        },
      });

      if (!productExists || productExists.length === 0) {
        this.logger.warn(`'${type}' Type does not exist`);
        return null;
      }

      const logProduct = productExists.map((product) => {
        return {
          id: product.id,
          type: product.type,
          description: product.description,
        };
      });

      this.logger.log(JSON.stringify(logProduct));
      return productExists;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async update(id: string, data: CreateProductsDto) {
    try {
      const productExists = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!productExists) {
        this.logger.warn(`'${id}', id does not exist`);
        return null;
      }

      this.logger.log(JSON.stringify(productExists));
      return await this.prisma.product.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const productExists = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!productExists) {
        this.logger.warn(`Product does not exist`);
        return null;
      }

      this.logger.log(JSON.stringify(productExists));
      return await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
