export interface User {
    email: string;
     password: string;
   }
 
   export interface CreditCardResponse {
     id: string;
     cardNumber: string;
     expirationDate: string;
     active: boolean;
     holder:string;
     updatedAt?: string;
     createdAt?: string;
   }