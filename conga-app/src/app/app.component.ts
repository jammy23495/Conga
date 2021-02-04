import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Array Declaration
  arr: number[] = [];
  input: string = ""

  //Global variables for calculating inflection point
  sum: number = 0;
  leftsum: number = 0;
  inflectionPoint: number = 0;
  inflectionValue: number = 0;
  showInflectionLabel: boolean = false;
  showInflectionButton: boolean = false;

  //Global variables for calculating maximum price drop
  showPriceDropLabel: boolean = false;
  showPriceDropShowLabel: string = "";
  showPriceDropButton: boolean = false;
  maximumDiff: number = 0
  minPrice: number = 0
  maxPrice: number = 0

  getArray(input: string) {
    this.input = input
    //Converting string into number array
    this.arr = input.split(',').map(function (item) {
      return parseInt(item, 10);
    });

    //Validation numbers inside the array
    this.arr = this.arr.filter(function (item) {
      return (!isNaN(item));
    });
    console.log(this.arr)
  }


  //Calculating the inflection point
  getInflectionPoint() {
    this.showInflectionLabel = true;
    this.showInflectionButton = true;

    this.showPriceDropLabel = false;
    this.showPriceDropButton = false;

    //Calculating the sum of the whole array
    for (let i = 0; i < this.arr.length; i++) {
      this.sum += this.arr[i];
    }

    for (let i = 0; i < this.arr.length; i++) {
      //Decrementing the right sum
      this.sum -= this.arr[i];

      //Incrementing the left sum
      this.leftsum += this.arr[i];

      //Comparing left and right sum
      if (this.leftsum == this.sum) {
        this.inflectionPoint = i;
        this.inflectionValue = this.arr[i];
        break;
      } else {
        this.inflectionPoint = -1;
        this.inflectionValue = -1;
      }
    }
  }

  //Calculationg the maximum price drop
  getPriceDrop() {
    this.showPriceDropLabel = true;
    this.showPriceDropButton = true;

    this.showInflectionLabel = false;
    this.showInflectionButton = false;

    for (let i = 0; i < this.arr.length; i++) {
      for (let k = i + 1; k < this.arr.length; k++) {
        //Comparing each price with every other price of the array
        if (this.arr[i] >= this.arr[k]) {

          //Difference between the prices
          let difference: number = (this.arr[i] - this.arr[k]);

          //Calculating the maximum difference in price
          if (difference > this.maximumDiff) {
            this.maximumDiff = difference;
            this.minPrice = this.arr[i]
            this.maxPrice = this.arr[k]
          }
        }
      }
    }

    this.showPriceDropShowLabel = "Maximum Difference is $" + this.maximumDiff + " between $" + this.minPrice + " and $" + this.maxPrice;
  }
}
