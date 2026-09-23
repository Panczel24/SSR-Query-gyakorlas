export interface Expense {
  /** Short description of the expense */
  name: string;
  /** Amount, in HUF, must be positive */
  amount: number;
  /** Category of the expense */
  category: "food" | "utilities" | "entertainment" | "misc";
}