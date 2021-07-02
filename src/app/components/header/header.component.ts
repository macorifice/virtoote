import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobile: boolean = false;
  value = 'Clear me';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    
    this.matIconRegistry.addSvgIcon(
      "account",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/icon_account.svg")
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
  }

}
