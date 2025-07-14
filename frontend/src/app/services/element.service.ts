import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Element } from '../models/element.model';

const ELEMENT_COLORS: Record<string, string> = {
  'Übergangsmetall': 'element-color-transition-metal',
  'Halogen': 'element-color-halogen',
  'Edelgas': 'element-color-noble-gas',
  'Metall': 'element-color-metal',
  'Erdalkalimetall': 'element-color-alkaline-earth-metal',
  'Alkalimetall': 'element-color-alkaline-metal',
  'Nichtmetall': 'element-color-non-metal',
  'Halbmetall': 'element-color-semi-metal'
};

@Injectable({ providedIn: 'root' })
export class CustomElementService {
  private base = `${environment.apiUrl}/elements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Element[]> {
    return this.http.get<Element[]>(this.base).pipe(
      map(elements => elements.map(el => {
        el = fixGroupAndPeriod(el);
        el = addColorClass(el);
        return el;
      }))
    );
  }

  create(entry: Partial<Omit<Element, 'id'>>): Observable<Element> {
    return this.http.post<Element>(this.base, entry);
  }
}

function fixGroupAndPeriod(element: Element): Element {
    if (element.atomicNumber >= 58 && element.atomicNumber <= 71) {
      element.group = element.atomicNumber - 54;
      element.period = 9;
    } else if (element.atomicNumber >= 90 && element.atomicNumber <= 103) {
      element.group = element.atomicNumber - 86;
      element.period = 10;
    }
  return element;
}

function addColorClass(element: Element): Element {
  console.log(element.atomicNumber, element.category.name);
    element.colorClass = ELEMENT_COLORS[element.category.name];
    return element;
}
