import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  name: string;
  description: string;
  ageRestriction: number;
  price: number;
  company_Id: number;

  constructor(
    public _dialogRef: MatDialogRef<InputFormComponent>, //public
    public productService: ProductService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public product: Product
    ) {
      if(this.product !== null){
        this.name = product.name;
        this.description = product.description;
        this.ageRestriction = product.ageRestriction;
        this.price = product.price;
      }
    }

  ngOnInit(): void {
  }

  closeForm(){
    this._dialogRef.close();
  }

  addProduct(){
    const product: Product = {
                              id: 0,
                              name: this.name,
                              description: this.description,
                              ageRestriction: this.ageRestriction,
                              price: this.price,
                              company_Id: 1
                             };

    this.productService.addProuct(product).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product added', '', {
          duration: 2000
        });

    });
  }

  editProduct(){
    const product: Product = {
                              id: this.product.id,
                              name: this.name,
                              description: this.description,
                              ageRestriction: this.ageRestriction,
                              price: this.price,
                              company_Id: 1
                             };

    this.productService.updateProuct(product).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product modified', '', {
          duration: 2000
        });

    });
  }


}
