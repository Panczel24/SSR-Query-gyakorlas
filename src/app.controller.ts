import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './Expense.js';
import { stat } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }




  @Get()
  @Render('index')
  getHome() {
    // const total = this.expense.reduce(
    //   (sum, expense) => sum + expense.amount,
    //   0
    // );

    const total = this.appService.getTotal();

    return {
      title: 'Összkiadás',
      total
    };
  }


  @Get('all')
  @Render("all")
  getAll() {
    return {
      title: "Összes kiadás",
      expense: this.appService.getExpenses()
    };
  }


  @Get('top3')
  @Render("all")
  getTop3() {
   const top3 = this.appService.getTop3();
    return {
      title: "Top 3",
      expense: top3
    };
  }


  @Get('search')
  @Render("search")
  getSearch(@Query('name') name?: string) {
    const searchTerm = name?? '';

    const results = this.appService.searchByName(searchTerm)

    return {
      title: 'Kiadás keresése',
      expense: results,
      searchTerm: searchTerm
    };
  }


  @Get('expensive')
  @Render("expensive")
  getExpensive(@Query("amount") amount?: string) {
    const minAmount = Number(amount);

    const results =this.appService.getMoreExpensiveThan(minAmount)

    return {
      title: 'Drága',
      expense: results,
      amount: amount ?? ''
    };
  }


  @Get('stats')
  @Render("stats")
  getStats() {

    const stats = this.appService.getStatistics();
    return{
      title:"statisztikák", ...stats
    }





    // const count = this.expense.length;

    // const total = this.expense.reduce(
    //   (sum, expense) => sum + expense.amount,
    //   0
    // );

    // const avg = total / count;

    // const categories = [
    //   "food",
    //   "utilities",
    //   "entertainment",
    //   "misc"
    // ] as const;

    // const categoryStats = categories.map(category => {
    //   const categoryExpenses = this.expense.filter(expense => {
    //     return expense.category === category;
    //   });

    //   const categoryCount = categoryExpenses.length;

    //   const categoryTotal = categoryExpenses.reduce(
    //     (sum, expense) => sum + expense.amount,
    //     0
    //   );

    //   const categoryAvg = categoryCount > 0
    //     ? categoryTotal / categoryCount
    //     : 0;

    //   return {
    //     category,
    //     count: categoryCount,
    //     total: categoryTotal,
    //     average: categoryAvg
    //   };
    // });

    // return {
    //   title: "Statisztikák",
    //   count,
    //   total,
    //   avg,
    //   categoryStats
    // };
  }
}
