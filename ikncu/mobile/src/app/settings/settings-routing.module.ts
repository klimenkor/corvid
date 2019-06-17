import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfilePageModule'
      },
      {
        path: 'camera',
        children: [
          {
            path: '',
            loadChildren: './camera/camera.module#CameraPageModule'
          },
          {
            path: 'new',
            loadChildren:
              './camera/new-camera/new-camera.module#NewCameraPageModule'
          },
          {
            path: 'edit/:cameraId',
            loadChildren:
              './camera/edit-camera/edit-camera.module#EditCameraPageModule'
          }
        ]
      },
      {
        path: 'face',
        children: [
          {
            path: '',
            loadChildren: './face/face.module#FacePageModule'
          },
          {
            path: 'new',
            loadChildren:
              './face/new-face/new-face.module#NewFacePageModule'
          },
          {
            path: 'edit/:faceId',
            loadChildren:
              './face/edit-face/edit-face.module#EditFacePageModule'
          }
        ]
      },
      {
        path: 'label',
        children: [
          {
            path: '',
            loadChildren: './label/label.module#LabelPageModule'
          },
          {
            path: 'new',
            loadChildren:
              './label/new-label/new-label.module#NewLabelPageModule'
          },
          {
            path: 'edit/:labelId',
            loadChildren:
              './label/edit-Label/edit-label.module#EditLabelPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
