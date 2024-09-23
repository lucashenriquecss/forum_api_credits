import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { UserEntity } from 'src/users/entities/user.entity';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { LogRequestEntity } from 'src/log_requests/entities/log_request.entity';
import { CreditSettingEntity } from 'src/credit-setting/entities/credit-setting.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { CreditUsageEntity } from 'src/credit-usage/entities/credit-usage.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { BannerEntity } from 'src/banners/entities/banner.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';


config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity,LikeEntity,SubscriptionPlanEntity,BannerEntity, LogRequestEntity,CreditSettingEntity,PaymentEntity,CategoryEntity,CommentEntity,CreditUsageEntity,SubcategoryEntity,ThreadEntity],
  logging: false,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => {
    console.log('Entidades carregadas:', dataSourceOptions.entities);

    console.log('Conexão com o banco de dados estabelecida com sucesso');
  })
  .catch((error) =>
    console.error('Erro ao conectar ao banco de dados:', error),
  );

export default dataSource;
