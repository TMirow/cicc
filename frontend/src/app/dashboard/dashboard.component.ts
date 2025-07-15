import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomElementService } from '../services/element.service';
import { Element } from '../models/element.model';

import { OverlayDirective } from '../overlay/overlay.directive';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, OverlayDirective, OverlayComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit{
  elements: Element[]=[];
  allElements: Element[]=[];
  groups: number[] = [];
  selectedGroup?: number;
  states: { id: number; name: string }[] = [];
  selectedStateId?: number = -1;
  categories: { id: number; name: string }[] = [];
  selectedCategoryId?: number = -1;

  constructor(
      private elementService:CustomElementService
  ){}

  ngOnInit(){ this.loadAllElements(); }

  loadAllElements(){ this.elementService.getAll().subscribe({
        next: data => {
          console.log('[Dashboard] data received:', data);
          this.allElements = data;
          this.elements = [...data]

          const allGroups = data.map(el => el.group).filter((g): g is number => g !== null);
          this.groups = [...new Set(allGroups)].sort((a, b) => a - b);

          const allStates = data.map(el => el.state);
          const uniqueStates = allStates.filter(
            (cat, index, self) =>
              cat && index === self.findIndex(c => c.id === cat.id)
          );
          this.states = [{ id: -1, name: 'Alle' }, ...uniqueStates];

          const allCategories = data.map(el => el.category);
          const uniqueCategories = allCategories.filter(
            (cat, index, self) =>
              cat && index === self.findIndex(c => c.id === cat.id)
          );
          this.categories = [{ id: -1, name: 'Alle' }, ...uniqueCategories];
        },
        error: err => console.error('[Dashboard] error:', err)
      });
  }

  applyFilters(): void {
    this.elements = this.allElements.filter(el => {
      const categoryMatch = this.selectedCategoryId === -1 || (this.selectedCategoryId !== undefined && el.category?.id === +this.selectedCategoryId);
      const stateMatch = this.selectedStateId === -1 || (this.selectedStateId !== undefined && el.state?.id === +this.selectedStateId);
      return categoryMatch && stateMatch;
    });
  }

  exportJson(): void {
    const dataJSON = JSON.stringify(this.elements, null, 2);
    const blob = new Blob([dataJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'elements.json';
    a.click();

    URL.revokeObjectURL(url);
  }
}
