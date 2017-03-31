export interface Currency {
  name: string;
  date: string;
  address: string;
  remarks: string;
  serialNumber: number;
  idNumber: number;
  phoneNumber: number;
  mobileNumber: number;
  nationality: string;
  totalCost: number;
  tax: number;
  taxAmount:number;
  taxTotal: number;
  grandTotal: number;
  items: Item[];
}

export interface Item {
  currencyName: string;
  currencyType: string;
  currencyValue:string;
  total: number;
  presentRate:number;
}
