import api from "../api/bunnyApi";


export interface CreditCard {
  id?: string;
  Title: string;
  CoverImageUrl: string;
  Description: string;
  Year: number;
  ImdbScore: number;
  TrailerYoutubeUrl: string;
  GameplayYoutubeUrl: string;
}

export interface UseCreditCard {
    userId: string;
    active: boolean;
    cardNumber: string;
    expirationDate: string;
    holder: string;
    creditToken: string;
  }

export const AllCards = {
  CreditCardAll: async () => {
    try {
      const res = await api.get("/creditcard", { method: "GET" });
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },

  CreditCardById: async (id: any) => {
    try {
      const res = await api.get(`/creditcard/${id}`);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },

  CreateCreditCard: async (data: UseCreditCard) => {
    try {
      const res = await api.post("/creditcard", data);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },

  EditCreditCard: async (id: string, Data: any) => {
    try {
      const res = await api.patch(`/creditcard/${id}`, Data);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },

  DeleteCreditCard: async (id: string) => {
    try {
      const res = await api.delete(`/creditcard/${id}`);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },
};
