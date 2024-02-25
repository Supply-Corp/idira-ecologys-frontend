import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./pages/auth/login/login.component")
  },
  {
    path:'home',
    loadComponent: () => import('./pages/home/home.component'),
    children:[
      {
        path:'',
        loadComponent: () => import('./pages/home/dashboard/dashboard.component')
      },
      {
        path:'sedes',
        loadComponent: () => import('./pages/home/sedes/sedes.component')
      },
      {
        path:'activities',
        loadComponent: () => import('./pages/home/activities/activities.component')
      },
      {
        path:'profile',
        loadComponent: () => import('./pages/home/profile/profile.component')
      },
    ]
  }
];
