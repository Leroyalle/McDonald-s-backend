import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductItemService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(id: string) {
    return await this.prisma.productItem.findFirst({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
  }
}
