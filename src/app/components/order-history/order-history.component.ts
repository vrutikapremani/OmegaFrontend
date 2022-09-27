import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
export interface PeriodicElement {
  ShipDate: string;
  OrderDate: string;
  OrderNumber:number,
  Amount:number
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    OrderNumber: 1,
    Amount: 100,
    OrderDate: "1/1/2017",
    ShipDate: "2/1/2017"
  },
  {
    OrderNumber: 2,
    Amount: 150,
    OrderDate: "2/1/2017",
    ShipDate: "2/10/2017"
  },
  {
    OrderNumber: 3,
    Amount: 200,
    OrderDate: "3/2/2017",
    ShipDate: "3/15/2017"
  },
  {
    OrderNumber: 4,
    Amount: 250,
    OrderDate: "4/3/2017",
    ShipDate: "4/21/2017"
  },
  {
    OrderNumber: 5,
    Amount: 200,
    OrderDate: "1/1/2017",
    ShipDate: "3/1/2017"
  },
  {
    OrderNumber: 6,
    Amount: 300,
    OrderDate: "10/1/2017",
    ShipDate: "10/3/2017"
  },
  {
    OrderNumber: 7,
    Amount: 110,
    OrderDate: "1/1/2018",
    ShipDate: "2/1/2018"
  },
  {
    OrderNumber: 8,
    Amount: 160,
    OrderDate: "2/1/2018",
    ShipDate: "2/15/2018"
  },
  {
    OrderNumber: 9,
    Amount: 210,
    OrderDate: "3/5/2018",
    ShipDate: "3/20/2018"
  },
  {
    OrderNumber: 10,
    Amount: 280,
    OrderDate: "4/6/2018",
    ShipDate: "4/22/2018"
  },
  {
    OrderNumber: 11,
    Amount: 210,
    OrderDate: "1/2/2018",
    ShipDate: "3/1/2018"
  }
 ];
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  displayedColumns: string[] = ['Amount', 'ShipDate', 'OrderNumber', 'OrderDate'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource();
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  openModal = false;
  closeResult: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.dataSource.data = ELEMENT_DATA;
    this.totalRows = ELEMENT_DATA.length
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
// OpenAddModal(AddOrderModal){  this.modalService.open(AddOrderModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//   this.closeResult = `Closed with: ${result}`;
// }, (reason) => {
//   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
// });
// }
//   // close modal

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}; `;
//     }
//   }
//   // close modal
//   onCancel() {
//     this.modalService.dismissAll();
//   }

}
