import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common';

import { ElementService } from './element.service';
import { ElementDto } from './dto/element.dto'

@Controller('elements')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get()
  allElements(): Promise<ElementDto[]> {
    return this.elementService.findAll();
  }

}
