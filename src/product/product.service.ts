import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.product.findMany({
      include: {
        items: true,
      },
    });
  }

  public async findOne(id: string) {
    return await this.prisma.product.findFirst({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}
