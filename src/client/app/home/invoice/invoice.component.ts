import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @Input() printData:any;
  name:string = 'User';
  constructor() {
    // this.printData = {};
    // this.printData.items = {};
    // this.printData.name = 'User';

  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
  }

  print(data:any): void {
     if(data) {
      let stringified = JSON.stringify(data);
    this.name = data.name;
    this.printData=data;
    debugger
    console.log('Data loaded to print');
    console.log(this.printData);
    }
    console.log('Print Invoice');
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          table,
          th,
          td {
            border: 1px solid black;
            border-collapse: collapse;
            
          },
          tr{
            text-align:center;
          }

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}


}
