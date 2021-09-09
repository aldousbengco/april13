import { Component } from '@angular/core';

import { Client } from '@app/_models/client';
import { AccountService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    client: Client;

    constructor(private accountService: AccountService){
        this.client = this.accountService.clientValue;
    }
}
