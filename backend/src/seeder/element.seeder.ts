
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from '../element/entities/element.entity';

@Injectable()
export class ElementSeeder {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepo: Repository<Element>,
  ) {}

  async seed(elements: Partial<Element>[]) {
    let elementCount = 0;
    for (const data of elements) {
      const existing = await this.elementRepo.findOne({
        where: { atomicNumber: data.atomicNumber },
      });

      if (!existing) {
        await this.elementRepo.save(this.elementRepo.create(data));
        elementCount++;
      } else {
        await this.elementRepo.update(existing.id, data);
        elementCount++;
      }
    }


    return elementCount
  }
}
