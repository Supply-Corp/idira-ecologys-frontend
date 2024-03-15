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
        path:'companies',
        children:[
          {
            path:'',
            loadComponent: () => import('./pages/home/company/company.component')
          },
          {
            path:'manage',
            loadComponent: () => import('./pages/home/company/company_manage/company_manage.component')
          },
          {
            path:'manage/:id',
            loadComponent: () => import('./pages/home/company/company_manage/company_manage.component')
          }
        ]
      },
      {
        path:'sedes',
        children:[

          {
            path:':id',
            loadComponent: () => import('./pages/home/sedes/sedes.component')
          },
          {
            path:':id/manage',
            loadComponent: () => import('./pages/home/sedes/sedes_manage/sedes_manage.component')
          },
          {
            path:':id/manage/:sedeId',
            loadComponent: () => import('./pages/home/sedes/sedes_manage/sedes_manage.component')
          },
        ]
      },
      {
        path:'users',
        children:[
          {
            path:'',
            loadComponent: () => import('./pages/home/users/users.component')
          },
          {
            path:'manage',
            loadComponent: () => import('./pages/home/users/user_manage/user_manage.component')
          },
          {
            path:'manage/:id',
            loadComponent: () => import('./pages/home/users/user_manage/user_manage.component')
          }
        ]
      },
      {
        path:'documents',
        loadComponent: () => import('./pages/home/documents/documents.component')
      },
      {
        path:'activities',
        loadComponent: () => import('./pages/home/activities/activities.component')
      },
      {
        path:'profile',
        loadComponent: () => import('./pages/home/profile/profile.component')
      },
      {
        path:'**',
        loadComponent: () => import('./pages/home/dashboard/dashboard.component')
      }
    ]
  }
];
