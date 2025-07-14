import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ElementModule } from './element/element.module';
import { Element } from './element/entities/element.entity';
import { ElementCategory } from './element/entities/element-category.entity';
import { ElementState } from './element/entities/element-state.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
          envFilePath: process.env.DOCKER_ENV === 'true' ? '.env.docker' : '.env.local',
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => {

            console.log('DOCKER_ENV:', process.env.DOCKER_ENV);
            console.log('envFilePath resolved to:', process.env.DOCKER_ENV === 'true' ? '.env.docker' : '.env.local');
            console.log('[Config] DB_HOST:', config.get('DB_HOST'));
            console.log('[Config] DB_PORT:', config.get('DB_PORT'));
            console.log('[Config] DB_USER:', config.get('DB_USER'));
            console.log('[Config] DB_NAME:', config.get('DB_NAME'));
            return {
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: parseInt(config.get('DB_PORT') || '5342', 10),
                username: config.get('DB_USER'),
                password: config.get('DB_PASS'),
                database: config.get('DB_NAME'),
                entities: [ElementState, ElementCategory, Element],
                synchronize: false,
            }
          },
          inject: [ConfigService],
        }),
    ElementModule,
  ],
})
export class AppModule {}