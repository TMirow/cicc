export class CreateElementDto {
    id: number;
    atomicNumber: number;
    symbol: string;
    name: string;
    atomicMass: number;
    stateId: number;
    categoryId: number;
    boilingPoint:  number;
    meltingPoint: number;
    electroNegativity: number
    density: number
    discovered: string
    oxidationStates: string
    group: number
    period: number
}