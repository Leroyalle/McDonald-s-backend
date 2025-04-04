import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createCartItemDto: CreateCartItemDto) {
    return await this.prisma.cartItem.create({
      data: {
        cartId: createCartItemDto.cartId,
        productItemId: createCartItemDto.productItemId,
      },
    });
  }

  public async findOne(cartId: string, productItemId: string) {
    return await this.prisma.cartItem.findFirst({
      where: {
        AND: [{ cartId }, { productItemId }],
      },
    });
  }

  public async updateQuantity(data: UpdateCartItemDto) {
    return await this.prisma.cartItem.update({
      where: {
        id: data.id,
      },
      data: {
        quantity: data.quantity,
      },
    });
  }

  public async remove(id: string) {
    return await this.prisma.cartItem.delete({ where: { id } });
  }
}
