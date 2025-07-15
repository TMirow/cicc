import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Element } from './entities/element.entity';
import { ElementCategory } from './entities/element-category.entity';
import { ElementState } from './entities/element-state.entity';

import { ElementDto } from './dto/element.dto'
import { CreateElementDto } from './dto/create-element.dto'

const ELEMENT_DTO_KEYS = [
  'id',
  'name',
  'symbol',
  'atomicNumber',
  'atomicMass',
  'boilingPoint',
  'meltingPoint',
  'electroNegativity',
  'density',
  'discovered',
  'oxidationStates',
  'group',
  'period',
];

const ELEMENT_RELATIONS =  ['category', 'state'];

@Injectable()
export class ElementService {
  constructor(
      @InjectRepository(Element)
      private readonly elementRepo: Repository<Element>,

      @InjectRepository(ElementCategory)
      private readonly categoryRepo: Repository<ElementCategory>,

      @InjectRepository(ElementState)
      private readonly stateRepo: Repository<ElementState>,
    ) {}


    async findAll(): Promise<ElementDto[]> {
      const elements = await this.elementRepo.find({
        relations: ELEMENT_RELATIONS,
      });

      return elements.map(this.toElementDto);
    }

    async findOne(id: number): Promise<ElementDto> {
      const element = await this.elementRepo.findOne({
        where: { id },
        relations: ELEMENT_RELATIONS,
      });

      if (!element) {
        throw new NotFoundException(`Element ID:${id} not found`);
      }

      return this.toElementDto(element);
    }

    private toElementDto(element: Element): ElementDto {
      //const dto: any = {};
      const dto: { [key: string]: any } = {};

      for (const key of ELEMENT_DTO_KEYS) {
        //dto[key] = element[key];
        (dto as any)[key] = (element as any)[key];
      }

      dto.category = {
        id: element.category?.id,
        name: element.category?.name,
      };

      dto.state = {
        id: element.state?.id,
        name: element.state?.name,
      };

      return dto as ElementDto;
    }
}
