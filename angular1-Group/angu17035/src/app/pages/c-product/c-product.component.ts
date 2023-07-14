import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-c-product',
  templateUrl: './c-product.component.html',
  styleUrls: ['./c-product.component.css']
})
export class CProductComponent implements OnInit {
  comments: { name: string, content: string }[] = [];
  name: string = '';
  content: string = '';
  food!: Food;
  // food: any=[];
  constructor(private http: HttpClient,activatedRoute:ActivatedRoute, private foodService:FoodService,
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      foodService.getFoodById(params.id).subscribe(serverFood => {
        this.food = serverFood;
      });
    })
   }
   ngOnInit(): void {
   
  }

  submitComment(): void {
    if (this.name && this.content) {
      const newComment = { name: this.name, content: this.content };
      this.comments.push(newComment);
      this.name = '';
      this.content = '';


      // Gửi bình luận đến backend
      this.http.post('http://localhost:4000/api/comment', newComment).subscribe(
        (response) => {
          console.log('Bình luận đã được gửi thành công!');
        },
        (error) => {
          console.log('Đã xảy ra lỗi khi gửi bình luận:', error);
        }
      );
    }
  }


  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');
  }

}