import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent {
 
  pizzaSizes: ('Small' | 'Medium' | 'Large' | 'ExtraLarge')[] = ['Small', 'Medium', 'Large', 'ExtraLarge'];

  toppingsList: ('Tomatoes' | 'Onions' | 'BellPepper' | 'Mushrooms' | 'Pineapple' | 'Sausage' | 'Pepperoni' | 'BarbecueChicken')[] = 
    ['Tomatoes', 'Onions', 'BellPepper', 'Mushrooms', 'Pineapple', 'Sausage', 'Pepperoni', 'BarbecueChicken'];

  order = {
    pizzaSize: '' as 'Small' | 'Medium' | 'Large' | 'ExtraLarge' | '', // Adding an empty string as a default
    toppings: {
      Tomatoes: false,
      Onions: false,
      BellPepper: false,
      Mushrooms: false,
      Pineapple: false,
      Sausage: false,
      Pepperoni: false,
      BarbecueChicken: false
    },
    selectedOffer: ''
  };

  sizePrices: { [key in 'Small' | 'Medium' | 'Large' | 'ExtraLarge']: number } = {
    Small: 5,
    Medium: 7,
    Large: 8,
    ExtraLarge: 9
  };

  toppingPrices: { [key in typeof this.toppingsList[number]]: number } = {
    Tomatoes: 1.00,
    Onions: 0.50,
    BellPepper: 1.00,
    Mushrooms: 1.20,
    Pineapple: 0.57,
    Sausage: 1.00,
    Pepperoni: 2.00,
    BarbecueChicken: 3.00
  };

  calculateTotal(): number {
    let total = 0;
  
    if (this.order.selectedOffer === 'offer1') {
      return 5; 
    } else if (this.order.selectedOffer === 'offer2') {
      return 9; 
    } else if (this.order.selectedOffer === 'offer3' && this.order.pizzaSize === 'Large') {
      const toppingCount = this.getToppingCountForOffer3(); 
      if (toppingCount <= 4) {
        const pizzaPrice = this.sizePrices.Large;
        const toppingsCost = this.calculateToppingsCostForOffer3();
        return (pizzaPrice + toppingsCost) * 0.5;
      }
    }
  
    if (this.order.pizzaSize) {
      total += this.sizePrices[this.order.pizzaSize];
    }
  
    total += this.calculateToppingsCost();
  
    return total;
  }

  calculateToppingsCost(): number {
    let toppingCost = 0;
    for (const [topping, selected] of Object.entries(this.order.toppings)) {
      if (selected && this.isToppingValid(topping)) {
        toppingCost += this.toppingPrices[topping as keyof typeof this.toppingPrices];
      }
    }
    return toppingCost;
  }

  isToppingValid(topping: string): topping is keyof typeof this.toppingPrices {
    return topping in this.toppingPrices;
  }
  getToppingCountForOffer3(): number {
    let count = 0;
    for (const [topping, selected] of Object.entries(this.order.toppings)) {
      if (selected) {
        if (topping === 'Pepperoni' || topping === 'BarbecueChicken') {
          count += 2; // These toppings count as 2 each
        } else {
          count += 1; // Other toppings count as 1
        }
      }
    }
    return count;
  }
  calculateToppingsCostForOffer3(): number {
    let toppingCost = 0;
    let toppingCount = 0;
    for (const [topping, selected] of Object.entries(this.order.toppings)) {
      if (selected) {
        if (topping === 'Pepperoni' || topping === 'BarbecueChicken') {
          // Pepperoni and Barbecue Chicken count as 2, so we add the price twice if it's selected
          toppingCost += this.toppingPrices[topping as keyof typeof this.toppingPrices] * 2;
          toppingCount += 2;
        } else {
          toppingCost += this.toppingPrices[topping as keyof typeof this.toppingPrices];
          toppingCount += 1;
        }
  
        // Stop when 4 toppings are counted
        if (toppingCount >= 4) {
          break;
        }
      }
    }
    return toppingCost;
  }
}
