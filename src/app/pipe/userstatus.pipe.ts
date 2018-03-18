import {Pipe, PipeTransform } from '@angular/core' ;
@Pipe({
    name: 'userstatuspipe'
})

export class UserStatusPipe implements PipeTransform {
  
    transform(value: any, ...args: any[]) {
        const statusMap = {
            '0': '有效',
            '1': '无效',
            '9': '锁定'
          };
          return statusMap[value];
    }
}
