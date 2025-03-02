export interface Expense {
    id: number;
    date: string;
    type?: string;
    description: string;
    value: number;
}