import { IsNumber, IsPositive } from 'class-validator';

export class CreateProductsDto {
  id?: string;
  type: string;
  description: string;
  measurement: string;
  @IsNumber()
  @IsPositive()
  price: number;
  image: string;
}
