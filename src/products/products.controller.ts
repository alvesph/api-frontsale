import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
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

  @Get(':type')
  async findType(@Param('type') type: string) {
    return this.productsService.findType(type);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateProductsDto) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
