
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementState } from '../element/entities/element-state.entity';

@Injectable()
export class ElementStateSeeder {
  constructor(
    @InjectRepository(ElementState)
    private readonly stateRepo: Repository<ElementState>,
  ) {}

  async seedAndReturnMap(names: string[]): Promise<Record<string, ElementState>> {
    const map: Record<string, ElementState> = {};

    for (const name of names) {
      let state = await this.stateRepo.findOneBy({ name });
      if (!state) {
        state = await this.stateRepo.save(this.stateRepo.create({ name }));
      }

      map[name] = state;
    }

    return map;
  }
}
