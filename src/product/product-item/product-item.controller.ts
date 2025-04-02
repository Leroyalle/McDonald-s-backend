import { Controller, Get, Param } from '@nestjs/common';
import { ProductItemService } from './product-item.service';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(id);
  }
}
