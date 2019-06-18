import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';
import { AuthGuard } from '../auth/login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'profile',
        canLoad: [ AuthGuard ],
        children: [
          {
            path: '',
            loadChildren: './profile/profile.module#ProfilePageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'edit/:profileId',
            loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule',
            canLoad: [ AuthGuard ]
          }
        ]
      },
      {
        path: 'camera',
        children: [
          {
            path: '',
            loadChildren: './camera/camera.module#CameraPageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'new',
            loadChildren: './camera/new-camera/new-camera.module#NewCameraPageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'edit/:cameraId',
            loadChildren: './camera/edit-camera/edit-camera.module#EditCameraPageModule',
            canLoad: [ AuthGuard ]
          }
        ]
      },
      {
        path: 'face',
        children: [
          {
            path: '',
            loadChildren: './face/face.module#FacePageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'new',
            loadChildren: './face/new-face/new-face.module#NewFacePageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'edit/:faceId',
            loadChildren: './face/edit-face/edit-face.module#EditFacePageModule',
            canLoad: [ AuthGuard ]
          }
        ]
      },
      {
        path: 'label',
        children: [
          {
            path: '',
            loadChildren: './label/label.module#LabelPageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'new',
            loadChildren: './label/new-label/new-label.module#NewLabelPageModule',
            canLoad: [ AuthGuard ]
          },
          {
            path: 'edit/:labelId',
            loadChildren: './label/edit-Label/edit-label.module#EditLabelPageModule',
            canLoad: [ AuthGuard ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/settings/profile',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'new-camera', loadChildren: './camera/new-camera/new-camera.module#NewCameraPageModule' },
  { path: 'edit-camera', loadChildren: './camera/edit-camera/edit-camera.module#EditCameraPageModule' },
  { path: 'new-face', loadChildren: './face/new-face/new-face.module#NewFacePageModule' },
  { path: 'edit-face', loadChildren: './face/edit-face/edit-face.module#EditFacePageModule' },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
