import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth-guard';
import { UserIdOptional } from 'src/user/decorators/userId-optional.decorator';

@UseGuards(OptionalAuthGuard)
@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Get(':productId')
  findOne(
    @Param('productId') productId: string,
    @Query('itemId') itemId: string | undefined,
    @UserIdOptional() userId: string,
  ) {
    return this.productItemService.findOne({ productId, itemId, userId });
  }
}
