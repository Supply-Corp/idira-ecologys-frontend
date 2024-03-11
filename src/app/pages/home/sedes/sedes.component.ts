import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Sede } from '@interfaces/sedes';
import { SedeService, SedeServiceData } from '@services/sede.service';
import { switchMap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SedesComponent {

  private routeActive = inject(ActivatedRoute);
  private sedeService = inject(SedeService);
  public sedeData = computed<SedeServiceData>(()=>this.sedeService.sedeData());
  displayedColumns: string[] = ['name', 'address', 'email', 'opt'];

  public sedes =  computed<Sede[]>(()=>this.sedeData().sedes);

  routeParamsSignal = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ id }) => this.sedeService.getSedesById(id))
    )
  );

  constructor(){
    this.routeParamsSignal()
  }

  deleteSede(id:number){
    this.sedeService.delete(id)
    .subscribe(_=>{
      this.sedeService.getSedesById(this.sedeData().companyId!).subscribe();
    })
  }

 }
