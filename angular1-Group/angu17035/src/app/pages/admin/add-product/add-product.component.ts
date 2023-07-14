import { Component } from '@angular/core';
import {FoodService} from '../../../services/food.service'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  foods: any[]
  constructor( private food: FoodService){
    this.food.getAll().subscribe((data:any) => {
      this.foods = data.food.docs
      console.log(this.foods)
    })
  }


  foodRemove(_id: string){
    this.food.foodRemove(_id).subscribe(() => {
      console.log("da xóa")
      
    })
  }
}
