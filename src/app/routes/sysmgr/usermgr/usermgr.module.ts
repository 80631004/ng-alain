import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { UserMgrRoutingModule } from './usermgr.route';
import { UserMgrListComponent } from 'app/routes/sysmgr/usermgr/list/usermgr-list.component';
import { UserStatusPipe } from 'app/pipe/userstatus.pipe';

const COMPONENTS = [UserMgrListComponent ];

@NgModule({
    imports: [
        SharedModule, UserMgrRoutingModule
    ],
    declarations: [
        ...COMPONENTS, UserStatusPipe
    ],
    entryComponents: COMPONENTS
})
export class UserMgrModule { }
