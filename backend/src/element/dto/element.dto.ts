export class ElementDto {
  id: number;
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  state: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  boilingPoint:  number;
  meltingPoint: number;
  electroNegativity: number
  density: number
  discovered: string
  oxidationStates: string
  group: number
  period: number
}
