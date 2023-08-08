import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';

import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll() {
    return await this.productsService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.getOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDTO) {
    const newProduct = await this.productsService.create(payload);
    return {
      message: `Product created sucessfully!`,
      product: newProduct,
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO
  ) {
    const update = await this.productsService.update(id, payload);
    return {
      message: `Product with id ${id} updated sucessfully.`,
      product: update,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleteProduct = await this.productsService.delete(id);
    console.log(deleteProduct);
    return {
      message: `Product with id ${id} deleted sucessfully.`,
    };
  }
}
