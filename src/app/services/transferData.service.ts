import { Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TransferDataService {
    private data:any;
    constructor() {
    }

    public getData(){
        // mila videna le data ref av manao get
        var data = this.data;
        this.data = null;
        return data;
    }

    public setData(valeur:any){
        this.data = valeur;
    }
}