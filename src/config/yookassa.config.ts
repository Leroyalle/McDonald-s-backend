import { ConfigService } from '@nestjs/config';
import type { YookassaOptions } from 'nestjs-yookassa';

export function getYookassaConfig(
  configService: ConfigService,
): YookassaOptions {
  return {
    shopId: configService.get<string>('YOOKASSA_SHOP_ID') as string,
    apiKey: configService.get<string>('YOOKASSA_SECRET_KEY') as string,
  };
}
