import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  @Input('link') link : string = ""

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
