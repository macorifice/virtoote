import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export interface Tile {
  id: number;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
  tiles: Tile[] = [
    {id: 1, cols: 3, rows: 2, color: 'transparent'},
    // {id: 2, cols: 3, rows: 4, color: 'transparent'},
    // {id: 3, cols: 1, rows: 1, color: 'transparent'},
    // {id: 4, cols: 1, rows: 1, color: 'transparent'},
    // {id: 5, cols: 1, rows: 1, color: 'transparent'},
  ];

  loading: boolean = true;
  isMobile: boolean = false;
  
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "tutorial",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/influencer.svg")
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2500);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      this.isMobile = true;
    }else{
      // false for not mobile device
      this.isMobile = false;
    }
  }
}
