
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementCategory } from '../element/entities/element-category.entity';

@Injectable()
export class ElementCategorySeeder {
  constructor(
    @InjectRepository(ElementCategory)
    private readonly categoryRepo: Repository<ElementCategory>,
  ) {}

  async seedAndReturnMap(names: string[]): Promise<Record<string, ElementCategory>> {
    const map: Record<string, ElementCategory> = {};

    for (const name of names) {
      let category = await this.categoryRepo.findOneBy({ name });
      if (!category) {
        category = await this.categoryRepo.save(this.categoryRepo.create({ name }));
      }
      map[name] = category;
    }

    return map;
  }
}
