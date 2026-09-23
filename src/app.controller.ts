import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './Expense.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  expense: Expense[] = [
    {
      name: 'Élelmiszer',
      amount: 12500,
      category: 'food',
    },
    {
      name: 'Villanyszámla',
      amount: 18500,
      category: 'utilities',
    },
    {
      name: 'Netflix',
      amount: 3990,
      category: 'entertainment',
    },
    {
      name: 'Buszjegy',
      amount: 2500,
      category: 'misc',
    },
    {
      name: 'Ebéd',
      amount: 4200,
      category: 'food',
    },
    {
      name: 'Internet',
      amount: 7500,
      category: 'utilities',
    },
    {
      name: 'Mozi',
      amount: 4500,
      category: 'entertainment',
    },
    {
      name: 'Tisztítószerek',
      amount: 6300,
      category: 'misc',
    },
    {
      name: 'Bevásárlás',
      amount: 15600,
      category: 'food',
    },
    {
      name: 'Vízszámla',
      amount: 5200,
      category: 'utilities',
    },
  ];



  @Get()
  @Render('index')
  getHello() {
    const total = this.expense.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      title: 'Összkiadas: ', total
    }
  }



  @Get('all')
  @Render("all")
  getAll() {
    return {
      title: "Összes kiadás",
      expense: this.expense
    }
  }


  @Get('top3')
  @Render("all")
  getTop3() {
    const top3 = [...this.expense]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
    return {
      title: "Top 3",
      expense: top3
    }
  }

  @Get('search')
  @Render("search")
  getSearch(@Query('name') name?: string) {
    const searchTerm = name?.toLocaleLowerCase() ?? '';
    const results = this.expense.filter(expense =>
      expense.name.toLocaleLowerCase().includes(searchTerm),
    );


    return {
      title: 'Kiadás keresése',
      expense: results,
      searchTerm: searchTerm,
    };
  }




  @Get('expensive')
  @Render("expensive")
  getExpensive(@Query("amount") amount?: string) {
    const minAmount = Number(amount);
    const results = this.expense.filter(
      expense => expense.amount> minAmount
    )
  
    return {
      title: 'Drága',
      expense: results,
      amount: amount?? '',
    };
  }




}
