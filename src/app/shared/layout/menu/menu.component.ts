import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { menuRoute } from '@shared/data/menu.data';
import { MenuRoute } from '@interfaces/menu';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  private router = inject(Router);
  public menuList:MenuRoute[] = menuRoute.ADMIN;


  goTo(url:string){
    window.open(url, "_blank");
  }

 }
