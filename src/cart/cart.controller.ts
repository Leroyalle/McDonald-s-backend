import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/user/decorators/userId.decorator';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() addToCartDto: CreateCartDto, @UserId() userId: string) {
    return this.cartService.addToCart(addToCartDto, userId);
  }

  @Get()
  findOne(@UserId() userId: string) {
    return this.cartService.getCart(userId);
  }

  @Patch('quantity')
  updateQuantity(
    @Body() updateQuantityDto: UpdateQuantityDto,
    @UserId() userId: string,
  ) {
    return this.cartService.updateQuantity(updateQuantityDto, userId);
  }

  @Delete()
  removeCartItem(
    @Body() removeCartItemDto: RemoveCartItemDto,
    @UserId() userId: string,
  ) {
    return this.cartService.removeCartItem(removeCartItemDto, userId);
  }

  @Delete('all')
  removeCart(@UserId() userId: string) {
    return this.cartService.removeCart(userId);
  }
}
