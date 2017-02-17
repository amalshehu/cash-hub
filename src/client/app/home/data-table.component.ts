import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-data-table',
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  @Input() rows: any;

  rows = [];

  selected = [];

  columns = [
  { prop: 'currency' },
  { name: 'Type' },
  { name: 'Amount' },
  { name: 'Rate' },
  { name: 'Rupee' }
  ];

  constructor() {
    this.fetch((data) => {
      this.selected = [data[2]];
      this.rows = data;
    });
  }

  fetch(cb) {
    // const req = new XMLHttpRequest();
    // req.open('GET', `assets/data/company.json`);
    //
    // req.onload = () => {
    //   cb(JSON.parse(req.response));
    // };
    //
    // req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  updateRowPosition() {
    let ix = this.getSelectedIx();
    let arr = [ ...this.rows ];
    arr[ix - 1] = this.rows[ix];
    arr[ix] = this.rows[ix - 1];
    this.rows = arr;
  }

  getSelectedIx() {
    return this.selected[0]['$$index'];
  }

}
