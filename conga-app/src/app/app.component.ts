import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Array Declaration
  arr: number[] = [21, 19, 24, 32, 30, 31, 34, 31, 31, 26, 29];

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

  //Calculation Inflection Point
  getInflectionPoint(): number {
    this.showInflectionLabel = true;
    this.showInflectionButton = true;

    // Maintains left cumulative sum
    this.leftsum = 0;

    // Maintains right cumulative sum
    this.sum = 0;
    let i: number = -1,
      j: number = -1;

    let size: number = 0;
    size = this.arr.length;

    for (i = 0, j = size - 1; i < j; i++, j--) {
      this.leftsum += this.arr[i];
      this.sum += this.arr[j];

      // Keep moving i towards center until 
      // left_sum is found lesser than right_sum
      while (this.leftsum < this.sum && i < j) {
        i++;
        this.leftsum += this.arr[i];
      }

      // Keep moving j towards center until 
      // right_sum is found lesser than left_sum
      while (this.sum < this.leftsum && i < j) {
        j--;
        this.sum += this.arr[j];
      }
    }
    if (this.leftsum == this.sum) {
      this.inflectionPoint = i;
      this.inflectionValue = this.arr[i];
      return i;
    } else {
      this.inflectionPoint = -1;
      this.inflectionValue = -1;
      return -1;
    }

  }

  //Calculating Price drop
  getPriceDrop() {

    this.showPriceDropLabel = true;
    this.showPriceDropButton = true;

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
