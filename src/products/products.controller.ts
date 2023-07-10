import { Body, Controller, Post, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async crate(@Body() data: CreateProductsDto) {
    return this.productsService.create(data);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
}
