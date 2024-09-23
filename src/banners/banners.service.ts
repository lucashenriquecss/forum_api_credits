import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannersService {

  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>
  ) { }

  async create(createBannerDto: CreateBannerDto) {
    const banner = this.bannerRepository.create(createBannerDto);
    return await this.bannerRepository.save(banner);
  }

  async findAll() {
    return await this.bannerRepository.find();;
  }

  async findOne(id: number) {

    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new Error(`Banner with ID ${id} not found`);
    }

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    return await this.bannerRepository.update(id, updateBannerDto)
  }

  async remove(id: number) {
     const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Banner with ID ${id} not found`);
    }
    return "success deleted"
  }
}
