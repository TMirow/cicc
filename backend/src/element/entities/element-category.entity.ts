import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class ElementCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
