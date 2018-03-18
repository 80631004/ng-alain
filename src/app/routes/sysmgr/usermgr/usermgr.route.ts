import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMgrListComponent} from 'app/routes/sysmgr/usermgr/list/usermgr-list.component';

const routes: Routes = [
  {
    path: 'usermgr',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserMgrListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMgrRoutingModule {}
