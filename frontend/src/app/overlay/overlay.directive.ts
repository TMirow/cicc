import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef
} from '@angular/core';
import { OverlayComponent } from './overlay.component';

@Directive({
  selector: '[appOverlay]',
  standalone: true
})
export class OverlayDirective {
  @Input('appOverlay') overlayData: any;

  private overlayRef: ComponentRef<OverlayComponent> | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
    this.overlayRef = factory.create(this.injector);

    this.overlayRef.instance.data = this.overlayData;

    this.appRef.attachView(this.overlayRef.hostView);

    const domElem = (this.overlayRef.hostView as any).rootNodes[0] as HTMLElement;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const overlayHeight = 250;
    const viewportHeight = window.innerHeight;
    const overlayWidth = 250;
    const viewportWidth = window.innerWidth;

    domElem.style.position = 'fixed';
    domElem.style.left = `${rect.left}px`;
    domElem.style.zIndex = '1000';

    if (rect.bottom + 5 + overlayHeight > viewportHeight) {
      domElem.style.top = `${rect.top - overlayHeight - 5}px`;
    } else {
      domElem.style.top = `${rect.bottom + 5}px`;
    }

    if (rect.left + 5 + overlayWidth > viewportWidth) {
      domElem.style.left = `${rect.left - overlayHeight - 5}px`;
    }

    document.body.appendChild(domElem);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.overlayRef) {
      this.appRef.detachView(this.overlayRef.hostView);
      this.overlayRef.destroy();
      this.overlayRef = null;
    }
  }
}
