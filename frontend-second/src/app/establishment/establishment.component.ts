import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html'
})
export class EstablishmentComponent implements OnInit {

  constructor(private accountService: EstablishmentService) { }

  ngOnInit(): void {
    this.accountService.getAll()
  }

}
