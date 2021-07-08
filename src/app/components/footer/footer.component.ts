import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export interface Tile {
  id: number;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  tiles: Tile[] = [
    {id: 1, cols: 3, rows: 1},
    {id: 2, cols: 1, rows: 2},
    {id: 3, cols: 1, rows: 1},
    {id: 4, cols: 2, rows: 1},
  ];

  isMobile: boolean = false;
  loading: boolean = true;
  
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "facebook",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/icons8-facebook-48.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "instagram",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/icons8-instagram.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "love",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/love_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "share",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/share_social_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "privacy",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/privacy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cookies",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/cookies.svg")
    );
  }

  ngOnInit(): void {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      this.isMobile = true;
    }else{
      // false for not mobile device
      this.isMobile = false;
    }
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
