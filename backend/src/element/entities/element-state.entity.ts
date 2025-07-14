import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Element } from './element.entity';

@Entity()
export class ElementState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
