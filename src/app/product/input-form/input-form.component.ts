import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.interface';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {


  product_id: number;
  name: string;
  description: string;
  ageRestriction: number;
  price: number;
  company_Id: number;
  company_Name: string;
  company: Company;

  lstCompanies: Company[];

  constructor(
    public _dialogRef: MatDialogRef<InputFormComponent>, //public
    public productService: ProductService,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: Product
    ) {
      if(this.product !== null){
        this.product_id = product.product_Id;
        this.name = product.name;
        this.description = product.description;
        this.ageRestriction = product.ageRestriction;
        this.price = product.price;
        this.company_Id = product.company_Id;
        this.company_Name = product.company_Name;

        this.company = { id: product.company_Id, company_Name: product.company_Name };
      }
    }

  ngOnInit(): void {
    this.deployCompanies();
  }

  closeForm(){
    this._dialogRef.close();
  }

  addProduct(){

    const product: Product = {
                                product_Id: 0,
                                name: this.name,
                                description: this.description,
                                ageRestriction: this.ageRestriction,
                                price: this.price,
                                //company_Id: this.company.id,
                                company_Id: this.company_Id,
                                //company_Name: this.company.company_Name
                                company_Name: this.company_Name
                               };
                               //console.log(product);

    this.productService.addProuct(product).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product added', '', {
          duration: 2000
        });

    });
  }

  editProduct(){
    const product: Product = {
                              product_Id: this.product_id,
                              name: this.name,
                              description: this.description,
                              ageRestriction: this.ageRestriction,
                              price: this.price,
                              //company_Id: this.company.id,
                              company_Id: this.company_Id,
                              //company_Name: this.company.company_Name
                              company_Name: this.company_Name
                             };
    console.log(product);

    this.productService.updateProuct(product).subscribe(() => {
        this._dialogRef.close();
        this.snackBar.open( 'Product modified', '', {
          duration: 2000
        });

    });
  }

  deployCompanies(){
    this.productService.deployCompany().subscribe(response => {
      this.lstCompanies = response;
      //console.log(this.lstCompanies)
    });
  }


}
