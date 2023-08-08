import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  private counter = 0;

  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.product.findMany();
  }

  async getOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDTO) {
    this.counter += 1;
    const newProduct: Product = {
      id: this.counter,
      ...payload,
    };
    await this.prisma.product.create({
      data: newProduct,
    });
    return newProduct;
  }

  async update(id: number, payload: UpdateProductDTO) {
    const product = await this.getOne(id);
    return await this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...product,
        ...payload,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id: Number(id) },
      });
    } catch (err) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
