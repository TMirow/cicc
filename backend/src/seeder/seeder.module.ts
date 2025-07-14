import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementSeeder } from './element.seeder';
import { ElementCategorySeeder } from './element-category.seeder';
import { ElementStateSeeder } from './element-state.seeder';

import { Element } from '../element/entities/element.entity';
import { ElementCategory } from '../element/entities/element-category.entity';
import { ElementState } from '../element/entities/element-state.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.DOCKER_ENV === 'true' ? '.env.docker' : '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5342', 10),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [ElementState, ElementCategory, Element],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Element, ElementCategory, ElementState]),
  ],
  providers: [ElementSeeder, ElementCategorySeeder, ElementStateSeeder],
})
export class SeederModule {}