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
  constructor(
      private elementService:CustomElementService
  ){}

  ngOnInit(){ this.loadEntries(); }

  loadEntries(){ this.elementService.getAll().subscribe({
        next: data => {
          console.log('[Dashboard] data received:', data);
          this.elements = data;
        },
        error: err => console.error('[Dashboard] error:', err)
      });
  }
}
