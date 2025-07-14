import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { ElementSeeder } from './element.seeder';
import { ElementCategorySeeder } from './element-category.seeder';
import { ElementStateSeeder } from './element-state.seeder';
import { ElementCategory } from '../element/entities/element-category.entity';
import { ElementState } from '../element/entities/element-state.entity';

import { parse } from 'csv-parse';
import * as fs from 'fs';
import { join } from 'path';

async function parseCsv(filePath: string): Promise<any[]> {
  const records: any[] = [];

  const parser = fs.createReadStream(filePath)
  .pipe(
    parse({
      columns: true,
      delimiter: ',',
      skip_empty_lines: true,
      trim: true,
    }),
  );

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}

const headerMap : Record<string, string> = {
  'Ordnungszahl': 'atomicNumber',
  'Symbol': 'symbol',
  'Name': 'name',
  'Atommasse': 'atomicMass',
  'Aggregatzustand': 'state',
  'Kategorie': 'category',
  'Siedepunkt (K)': 'boilingPoint',
  'Schmelzpunkt (K)': 'meltingPoint',
  'Elektronegativität': 'electroNegativity',
  'Dichte (g/cm³)': 'density',
  'Entdeckt': 'discovered',
  'Oxidationszahlen': 'oxidationStates',
  'Gruppe': 'group',
  'Periode': 'period',
};

function mapHeaders(record: Record<string, any>): Partial<any> {
  //const mapped: Record<string, any> = {};
  const mapped: { [key: string]: any } = {};
  for (const [k, v] of Object.entries(record)) {
    const key = headerMap[k];
    if (key) {
      mapped[key] = v;
    }
  }
  return mapped;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const elementSeeder = app.get(ElementSeeder);
  const elementCategorySeeder = app.get(ElementCategorySeeder);
  const elementStateSeeder = app.get(ElementStateSeeder);

  console.log('Data seeding started');

  // Elemente aus CSV parsen
  const filePath = join(__dirname, '../../import', 'elements.csv');
  const raw = await parseCsv(filePath);
  const mappedElements = raw.map(mapHeaders);

  // State extrahieren und Import in eigene Tabelle
  const extractedStates = [...new Set(mappedElements.map(e => e.state))];
  const mappedStates = await elementStateSeeder.seedAndReturnMap(extractedStates);

  // State extrahieren und Import in eigene Tabelle
  const extractedCategories = [...new Set(mappedElements.map(e => e.category))];
  const mappedCategories = await elementCategorySeeder.seedAndReturnMap(extractedCategories);

  const finalElements = mappedElements.map(e => ({
    ...e,
    group: e.group ? Math.floor(parseFloat(e.group)) : null, // fix for group (float to int)
    state: mappedStates[e.state] as ElementState,
    category: mappedCategories[e.category] as ElementCategory,
  }));

  const elementCount = await elementSeeder.seed(finalElements);
  console.log(`Data seeding done - ${elementCount} elements added`);
  await app.close();
}

bootstrap();
