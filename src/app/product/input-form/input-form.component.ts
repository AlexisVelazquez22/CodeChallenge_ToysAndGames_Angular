import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';
import { Company } from 'src/app/models/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import { ProductResponse } from 'src/app/models/product-response.interface';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  productResponse: ProductResponse = {};
  product_id: number;
  lstCompanies: Company[];

  constructor(
    public _dialogRef: MatDialogRef<InputFormComponent>, //public
    private productService: ProductService,
    private _companyService: CompanyService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public product: Product
    )
  {
    if(this.product !== null){
      this.product_id = product.productId;
      this.productResponse = {
        name: product.name,
        description: product.description,
        ageRestriction: product.ageRestriction,
        price: product.price,
        companyId: product.companyId
      };
    }
  }

  ngOnInit(): void {
    this.deployCompanies();
  }

  closeForm(){
    this._dialogRef.close();
  }

  addProduct(){
    this.productService.addProuct(this.productResponse).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product added', '', {
          duration: 2000
        });
    });
  }

  editProduct(){
    this.productService.updateProuct(this.productResponse, this.product_id).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product modified', '', {
          duration: 2000
        });
    });
  }

  deployCompanies(){
    this._companyService.deployCompany().subscribe(response => {
      this.lstCompanies = response;
      console.log(this.lstCompanies)
    });
  }

}
