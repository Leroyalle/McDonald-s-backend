import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemService } from './cart-item/cart-item.service';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartItemService: CartItemService,
  ) {}

  public async addToCart(addToCartDto: CreateCartDto, userId: string) {
    const findCart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    // TODO: проверить что такого товара нет в корзине +
    // если есть - увеличить количество +
    // сделать отдельный ресурс для cartItem +
    // проверить отдавать ли cartItem вместе с продуктом

    if (!findCart) {
      return await this.prisma.cart.create({
        data: {
          userId,
          items: {
            create: {
              productItemId: addToCartDto.itemId,
            },
          },
        },
      });
    }

    const findCartItem = await this.cartItemService.findOne(
      findCart.id,
      addToCartDto.itemId,
    );

    if (findCartItem) {
      return await this.cartItemService.updateQuantity({
        id: findCartItem.id,
        quantity: findCartItem.quantity + 1,
      });
    }

    return await this.cartItemService.create({
      cartId: findCart.id,
      productItemId: addToCartDto.itemId,
    });
  }

  public async findOne(userId: string) {
    return await this.prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            productItem: true,
          },
        },
      },
    });
  }

  public async removeCartItem(data: RemoveCartItemDto, userId: string) {
    const findCart = await this.findOne(userId);

    if (!findCart) {
      throw new NotFoundException('Cart not found');
    }

    const findCartItem = await this.cartItemService.findOne(
      findCart.id,
      data.productItemId,
    );

    if (!findCartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return await this.cartItemService.remove(findCartItem.id);
  }

  public async removeCart(userId: string) {
    const findCart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!findCart) {
      throw new NotFoundException('Cart not found');
    }

    return await this.prisma.cart.delete({
      where: {
        id: findCart.id,
      },
    });
  }

  public async updateQuantity(data: UpdateQuantityDto, userId: string) {
    const findCart = await this.findOne(userId);

    if (!findCart) {
      throw new NotFoundException('Cart not found');
    }

    const findCartItem = await this.cartItemService.findOne(
      findCart.id,
      data.productItemId,
    );

    if (!findCartItem) {
      throw new NotFoundException('Cart item not found');
    }
    if (data.quantity === 0) {
      return await this.cartItemService.remove(findCartItem.id);
    }
    return await this.cartItemService.updateQuantity({
      id: findCartItem.id,
      quantity: data.quantity,
    });
  }
}
