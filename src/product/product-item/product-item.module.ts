import { forwardRef, Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { CartModule } from 'src/cart/cart.module';
import { CartItemModule } from 'src/cart/cart-item/cart-item.module';
import { ProductModule } from '../product.module';

@Module({
  imports: [CartModule, CartItemModule, forwardRef(() => ProductModule)],
  controllers: [ProductItemController],
  providers: [ProductItemService],
  exports: [ProductItemService],
})
export class ProductItemModule {}
