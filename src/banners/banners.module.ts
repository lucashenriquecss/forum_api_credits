import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { BannerEntity } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity]),LogRequestsModule],

  controllers: [BannersController],
  providers: [BannersService],
  exports: [BannersService]
})
export class BannersModule {}
