import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { ElementService } from './element.service';
import { ElementDto } from './dto/element.dto'

@Controller('elements')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get()
  allElements(): Promise<ElementDto[]> {
    return this.elementService.findAll();
  }

  @Get('group/:groupId')
  elementsForGroup(@Param('groupId') groupId: string): Promise<ElementDto[]> {
    const parsed = Number(groupId);
    return this.elementService.findByGroup(parsed);
  }

  @Get('state/:stateId')
  elementsForState(@Param('stateId') stateId: string) {
    const parsed = Number(stateId);
    if (isNaN(parsed)) {
        throw new BadRequestException(`invalid stateId: ${stateId}`);
    }
    return this.elementService.findByState(parsed);
  }

  @Get('category/:categoryId')
  elementsForCategory(@Param('categoryId') categoryId: string) {
    const parsed = Number(categoryId);
    if (isNaN(parsed)) {
        throw new BadRequestException(`invalid categoryId: ${categoryId}`);
    }
    return this.elementService.findByCategory(parsed);
  }
}
