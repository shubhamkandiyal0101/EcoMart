import { Component, Input } from '@angular/core';
import { ProductCatModel } from '../../../models/product-model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input({required:true}) cat!: ProductCatModel; 

}
