import { Injectable } from '@nestjs/common';
import { Expense } from './Expense.js';
import { filter, map } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

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
    // {
    //   name: 'BKK bérlet',
    //   amount: 8950,
    //   category: 'transport',
    // },
  ];






  getExpenses(): Expense[] {
    return this.expense;
  }


  getTotal(): number {
    return this.expense.reduce((sum, expense) => sum + expense.amount, 0)
  }


  getTop3(): Expense[] {
    return [...this.expense]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }


  searchByName(name: string): Expense[] {
    const searchTerm = name.toLowerCase();
    return this.expense.filter(expense =>
      expense.name.toLowerCase().includes(searchTerm)
    )
  }


  getMoreExpensiveThan(amount: number): Expense[] {
    return this.expense.filter(expense =>
      expense.amount > amount
    )
  }


  getStatistics() {



    const count = this.expense.length;

    const total = this.expense.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const avg = total / count;
    const categoryMap = new Map<string, Expense[]>();
    for (const expense of this.expense) {
      if (!categoryMap.has(expense.category)) {
        categoryMap.set(expense.category, [])

      }
      categoryMap.get(expense.category)!.push(expense);
    }

    const categoryStats = Array.from(categoryMap.entries()).map(
      ([category, categoryExpenses]) => {
        const categoryCount = categoryExpenses.length;
        const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        const categoryAvg = categoryCount > 0 ? categoryTotal / categoryCount : 0;

        return {
          category,
          count: categoryCount,
          total: categoryTotal,
          average: categoryAvg
        };

      }
    )

    /*
    const categories = [
      "food",
      "utilities",
      "entertainment",
      "misc"
    ] as const;

    const categoryStats = categories.map(category => {
      const categoryExpenses = this.expense.filter(expense => {
        return expense.category === category;
      });

      const categoryCount = categoryExpenses.length;

      const categoryTotal = categoryExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      const categoryAvg = categoryCount > 0
        ? categoryTotal / categoryCount
        : 0;

      return {
        category,
        count: categoryCount,
        total: categoryTotal,
        average: categoryAvg
      };
    });

    */

    return {
      count,
      total,
      avg,
      categoryStats
    };

  }

}
