import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { CHARTS } from '../../../../../_mock/_chart';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './v1.component.html'
})
export class DashboardV1Component implements OnInit {

    constructor(private http: _HttpClient, public msg: NzMessageService) { }

    todoData: any[] = [
        { completed: true, avatar: '1', name: '苏先生', content: `请告诉我，我应该说点什么好？` },
        { completed: false, avatar: '2', name: 'はなさき', content: `ハルカソラトキヘダツヒカリ` },
        { completed: false, avatar: '3', name: 'cipchk', content: `this world was never meant for one as beautiful as you.` },
        { completed: false, avatar: '4', name: 'Kent', content: `my heart is beating with hers` },
        { completed: false, avatar: '5', name: 'Are you', content: `They always said that I love beautiful girl than my friends` },
        { completed: false, avatar: '6', name: 'Forever', content: `Walking through green fields ，sunshine in my eyes.` }
    ];

    quickMenu = false;

    webSite: any[] = [ ];
    salesData: any[] =  [ ];
    offlineChartData: any[] = [];

    todos: Observable<any>;
     _todos: BehaviorSubject<any>; 
    ngOnInit() {
        this._todos = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this._todos.next(Object.assign({}, CHARTS['/chart']));
        this.todos = this._todos.asObservable();
        this.todos.subscribe((res: any) => {
            this.webSite = res.visitData.slice(0, 10);
            this.salesData = res.salesData;
            this.offlineChartData = res.offlineChartData;
        });
        /*
        this.http.get('/chart').subscribe((res: any) => {
            this.webSite = res.visitData.slice(0, 10);
            this.salesData = res.salesData;
            this.offlineChartData = res.offlineChartData;
        });*/
    }
}
