import { Routes } from '@angular/router';
import { authGuard, unauthGuard } from '@shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate:[
      unauthGuard
    ],
    loadComponent: () => import("./pages/auth/login/login.component")
  },
  {
    path:'home',
    loadComponent: () => import('./pages/home/home.component'),
    canActivate:[
      authGuard
    ],
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
        path:'categories',
        children:[
          {
            path:'',
            loadComponent: () => import('./pages/home/directory/directory.component')
          },
          {
            path:'manage',
            loadComponent: () => import('./pages/home/directory/directory_manage/directory_manage.component')
          },
          {
            path:'manage/:id',
            loadComponent: () => import('./pages/home/directory/directory_manage/directory_manage.component')
          },
          {
            path:'subdirectory/:id',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory.component')
          },
          {
            path:'subdirectory/:id/manage',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory_manage/sub-directory_manage.component')
          },
          {
            path:'subdirectory/:id/manage/:subDirId',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory_manage/sub-directory_manage.component')
          },
          {
            path:'subdirectory/:id/years/:subDirId',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory-year/sub-directory-year.component')
          },
          {
            path:'subdirectory/:id/years/:subDirId/manage',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory-year/sub-directory-year_manage/sub-directory-year_manage.component')
          },
          {
            path:'subdirectory/:id/years/:subDirId/manage/:subDirYearId',
            loadComponent: () => import('./pages/home/directory/sub-directory/sub-directory-year/sub-directory-year_manage/sub-directory-year_manage.component')
          },
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
