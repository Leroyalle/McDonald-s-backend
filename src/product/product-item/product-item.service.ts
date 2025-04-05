import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItemService } from 'src/cart/cart-item/cart-item.service';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from '../product.service';

@Injectable()
export class ProductItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
    private readonly productService: ProductService,
  ) {}

  public async findOne({
    productId,
    itemId,
    userId,
  }: {
    productId: string;
    itemId: string | undefined;
    userId: string;
  }) {
    const findProduct = await this.productService.findOne(productId);

    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }

    const findProductItem = await this.prisma.productItem.findFirst({
      where: {
        id: itemId ?? findProduct.items[0].id,
      },
      include: {
        product: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!findProductItem) {
      throw new NotFoundException('Product item not found');
    }

    const findCart = await this.cartService.findOne(userId);

    if (!findCart) {
      return findProductItem;
    }

    const findCartItem = await this.cartItemService.findOne(
      findCart.id,
      findProductItem.id,
    );

    if (!findCartItem) {
      return findProductItem;
    }

    return {
      ...findProductItem,
      quantity: findCartItem.quantity,
      isAddToCart: !!findCartItem,
    };
  }
}
