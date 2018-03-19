import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SFSchema } from 'nz-schema-form';

@Component({
    selector: 'usermgr-list',
    templateUrl: './usermgr-list.component.html'
})
export class UserMgrListComponent implements OnInit {
    q: any = {
        page: 1,
        limit: 10,
        orderByField: ''
    };
    data: any[] = [];
    nzTotal: any;
    loading = false;
    listQueryShema: any = {};
    listQueryModel: any = {};
    sortMap: any = {};

    modalVisible = false;
    description = '';
    

    constructor(private router: Router, private route: ActivatedRoute, private http: _HttpClient, public msg: NzMessageService) {}

    ngOnInit() {
        this.listQueryShema = JSON.parse(require('!!raw-loader!./usermgr-list-schema.json'));
        this.listQueryModel = {email: 'cipchk@qq.com'};
        this.getData({});
    }

    actions = {
        send: (form: any) => {
        // this.msg.success(JSON.stringify(form.value));
           this.getData(form.value);
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    getData(formJson: any) {
        this.pageChange(1).then(() => {
            this.http.get('admin/user/userPage', Object.assign({}, this.q, formJson)).subscribe((res: any) => {
                this.data = res.records;
                this.nzTotal = res.total;
            });
        });
    }

    add() {
       // this.modalVisible = true;
       // this.description = '';
       this.router.navigate(['/demo/tablemgr/add']);
    }

    save() {
        this.loading = true;
        this.http.post('/rule', { description: this.description }).subscribe(() => {
            // this.getData();
            setTimeout(() => this.modalVisible = false, 500);
        });
    }

    remove() {
        // this.http.delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') }).subscribe(() => {
        //     this.getData();

        // });
    }

    approval() {
        // this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
    }

    sort(field: string, value: any) {
        this.sortMap = {};
        this.sortMap[field] = value;
        this.q.sorter = value ? `${field}_${value}` : '';
        // this.getData();
    }

    pageChange(page: number): Promise<any> {
        this.q.page = page;
        this.loading = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                this.loading = false;
                resolve();
            }, 500);
        });
    }
}
