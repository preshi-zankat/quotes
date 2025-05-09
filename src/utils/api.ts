import { Quote } from "@/types/quote";

const BASE_URL = "https://dummyjson.com/quotes";

export const fetchQuotes = async (limit = 10, skip = 0): Promise<{ quotes: Quote[]; total: number }> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return res.json();
};

export const fetchQuoteById = async (id: number): Promise<Quote> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const fetchRandomQuote = async (): Promise<Quote> => {
  const res = await fetch(`${BASE_URL}/random`);
  return res.json();
};