import { Book } from "./book";

export interface Checkout {
    id: string;
    borrowedBook: Book;
    checkedOutDate: string;
    dueDate: string;
    returnedDate: string;
    borrowerFirstName: string;
    borrowerLastName: string;
}