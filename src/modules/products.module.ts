import { Module } from '@nestjs/common';

import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
