import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserMgrModule } from './usermgr/usermgr.module';


@NgModule({
    imports: [
        UserMgrModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysMgrModule {}
