import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Client } from '../../_models/client';

@Injectable ({ provideIn: 'root' })
export class AccountService {
    private clientSubject: BehaviorSubject<Client>;
    public client: Observable<Client>;

    constructor (
        private router: Router,
        private http: HttpClient
    ) {
        this.clientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('establishment')));
        this.client = this.clientSubject.asObservable();
    }

    public get clientValue(): Client {
      return this.clientSubject.value;
    }

    login(username, password) {
        return this.http.post<Client>(`${environment.apiUrl}/clients/authenticate`, { username, password })
            .pipe(map(client => {
                //
                localStorage.setItem('client', JSON.stringify(client));
                this.clientSubject.next(client);
                return client;
            }));
    }

    logout() {
        //
        localStorage.removeItem('client');
        this.clientSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(client: Client) {
        return this.http.post( `${environment.apiUrl}/clients/register`, client);
    }

    getAll(){
      return this.http.get<Client[]>(`${environment.apiUrl}/clients`);
    }

    getById(id: string){
        return this.http.get<Client[]>(`${environment.apiUrl}/clients/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/clients/${id}`, params)
            .pipe(map(x => {
                //
                if (id == this.clientValue.id){
                    // update local storage
                    const client = { ...this.clientValue, ...params};
                    localStorage.setItem('client', JSON.stringify(client));

                    //
                    this.clientSubject.next(client);
                }
                return x;
            }));
    }

    delete(id: string){
        return this.http.delete(`${environment.apiUrl}/clients/${id}`)
            .pipe(map(x => {
                //
                if (id == this.clientValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

}
