import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    clients = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(clients => this.clients = clients);
    }

    deleteClient(id: string) {
        const client = this.clients.find(x => x.id === id);
        client.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.clients = this.clients.filter(x => x.id !== id));
    }
}
