import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arr: number[] = [1,2,3,4,1,2,3];
  sum: number = 0;
  leftsum: number = 0;
  inflectionPoint: number = 0;
  inflectionValue: number = 0;
  showInflectionLabel: boolean = false;
  showInflectionButton: boolean = false;

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
    if (this.leftsum == this.sum)
    {
      this.inflectionPoint = i;
      this.inflectionValue = this.arr[i];
      return i;
    }
    else
    {
      this.inflectionPoint = -1;
      this.inflectionValue = -1;
      return -1;
    }

  }
}
