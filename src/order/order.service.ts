import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CurrencyEnum,
  PaymentCreateRequest,
  PaymentMethodsEnum,
  YookassaService,
} from 'nestjs-yookassa';
import { CartItem, ProductItem } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly yookassaService: YookassaService,
    private readonly cartService: CartService,
    private readonly configService: ConfigService,
  ) {}

  public async create(userId: string) {
    const findCart = await this.cartService.findOne(userId);

    if (!findCart) {
      throw new NotFoundException('Cart is not found');
    }

    const totalAmount = this.calcTotalAmount(findCart.items);

    if (totalAmount <= 0) {
      throw new ConflictException('Cart is empty');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'PENDING',
        items: JSON.stringify(findCart.items),
      },
    });

    const paymentData: PaymentCreateRequest = {
      amount: {
        value: totalAmount,
        currency: CurrencyEnum.RUB,
      },
      description: 'Test payment',
      payment_method_data: {
        type: PaymentMethodsEnum.yoo_money,
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url:
          (this.configService.get<string>('ALLOWED_ORIGIN') as string) +
          '?paid',
      },
      metadata: {
        order_id: order.id,
      },
    };

    const createdPayment =
      await this.yookassaService.createPayment(paymentData);

    if (createdPayment.confirmation?.type === 'redirect') {
      return {
        paymentUrl: createdPayment.confirmation.confirmation_url,
      };
    } else {
      throw new ConflictException('Payment type is not supported');
    }
  }

  async capturePayment(paymentId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: paymentId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const capturedPayment =
      await this.yookassaService.capturePayment(paymentId);

    return capturedPayment;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} ${updateOrderDto.fullname} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private calcTotalAmount(
    cartItems: (CartItem & { productItem: ProductItem })[],
  ) {
    return cartItems.reduce(
      (acc, item) => acc + item.productItem.price * item.quantity,
      0,
    );
  }
}
