import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {

  private userService = inject(UserService);
  public dataUser = this.userService.userData;

  displayedColumns: string[] = ['name', 'email', 'role', 'opt'];
  // displayedColumns: string[] = ['Nombre', 'Email', 'Razón Social', 'Ruc', 'Distrito', 'Provincia', 'Dirección'];
  dataSource = computed<User[]>(()=>this.dataUser().users);

  deleteUser(id:number){
    this.userService.delete(id)
    .subscribe(_=>{
      this.userService.getUsers();
    })
  }
}
