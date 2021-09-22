export interface Slide {
  id: number | string;
  src: string;
  alt?: string;
  title?: string;
}

// <ng-container *ngFor="let slide of slidesStore">
// <ng-template carouselSlide [id]="slide.id">
//   <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
// </ng-template>
// </ng-container>
