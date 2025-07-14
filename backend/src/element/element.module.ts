import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ElementController } from './element.controller';
import { ElementService } from './element.service';

import { Element } from './entities/element.entity';
import { ElementCategory } from './entities/element-category.entity';
import { ElementState } from './entities/element-state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, ElementCategory, ElementState])
  ],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
