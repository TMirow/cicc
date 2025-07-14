import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ElementState } from './element-state.entity';
import { ElementCategory } from './element-category.entity';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  atomicNumber: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column('float')
  atomicMass: number;

  @ManyToOne(() => ElementState)
  state: ElementState;

  @ManyToOne(() => ElementCategory)
  category: ElementCategory;

  @Column('float')
  boilingPoint:  number;

  @Column('float')
  meltingPoint: number;

  @Column('float')
  electroNegativity: number;

  @Column('float')
  density: number;

  @Column()
  discovered: string;

  @Column()
  oxidationStates: string;

  @Column('int', { nullable: true, name: 'element_group' })
  group: number | null;

  @Column('int', { nullable: true, name: 'element_period' })
  period: number;
}