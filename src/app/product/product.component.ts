import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';
import { InputFormComponent } from './input-form/input-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public lst: Product[];
  public columnNames: string[] = ['Id', 'Name', 'Age', 'Description', 'Company', 'Price', 'Actions'];

  constructor(
    private _productService: ProductService,
    public dialog: MatDialog,
    public snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProduct().subscribe( response => {
      this.lst = response;
      console.log(this.lst);
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(InputFormComponent);

    dialogRef.updateSize('245px', '455px');
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  openEditDialog(product: Product){
    const dialogRef = this.dialog.open(InputFormComponent, {
      data: product
    });
    console.log(product);

    dialogRef.updateSize('245px', '455px');
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  deleteProduct(id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.updateSize('245px', '245px');
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this._productService.deleteProuct(id).subscribe(() => {
          this.snack.open('Product deleted', '', {
            duration: 2000
          });
          this.getProducts();
        });
      }
    });
  }

}
