import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';

@Module({
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
