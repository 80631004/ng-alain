import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {HttpErrorResponse} from '@angular/common/http';
import {zip} from 'rxjs/observable/zip';
import {Observable} from 'rxjs/Rx';
import {ITokenService, DA_SERVICE_TOKEN} from '@delon/auth';
import {ReuseTabService} from '@delon/abc';
import {Component, OnDestroy, Inject, Optional} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class LoginService {

    constructor(private http : _HttpClient, @Optional()@Inject(ReuseTabService)private reuseTabService : ReuseTabService, @Inject(DA_SERVICE_TOKEN)private tokenService : ITokenService) {}

    login(credentials, callback?) {
        const cb = callback || function () {};

        const data = {
            'username': credentials.username,
            'password': credentials.password,
            'randomStr': credentials.randomStr,
            'code': credentials.code,
            'grant_type': 'password',
            'scope': 'server'
        };

        return new Promise((resolve, reject) => {
            const obs: Observable < HttpResponse < Object >> = this.http.post('auth/oauth/token', null, data, {
                    headers: {
                        'Authorization': 'Basic cGlnOnBpZw=='
                    },
                    observe: 'response'
                });

            obs.subscribe((response) => {
                resolve(response);
                this.authenticateSuccess(response,credentials);
                return cb();
            }, (err) => {
                console.log(err);
                reject(err);
                return cb(err);
            });
        });
    }

    authenticateSuccess(resp,credentials) {
        // 清空路由复用信息
        this.reuseTabService.clear();
        var data = resp.body;
        this.tokenService.set({
                token: data.access_token,
                name: credentials.username,
                //email: `cipchk@qq.com`,
                //id: 10000,
                time: + new Date,
                expires_in: data.expires_in,
                refresh_token: data.refresh_token
            });
        return '';
    }
}
