import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductItemModule } from './product-item/product-item.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ProductItemModule],
})
export class ProductModule {}
