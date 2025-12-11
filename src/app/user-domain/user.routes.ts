import { Routes } from '@angular/router';
import { UserMainLayoutComponent } from './user-main-layout/user-main-layout.component';
import { ProfileComponent } from './profile/profile.component';

export const userRoutes: Routes = [
    {
          path:'',
          component: UserMainLayoutComponent,
          children: [
              {
                  path:'',
                  component: ProfileComponent
              },
            ]
    }
];
