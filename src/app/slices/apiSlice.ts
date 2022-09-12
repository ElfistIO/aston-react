import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Card } from "scryfall-sdk";

export const magicApi = createApi({
  reducerPath: "magicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.scryfall.com" }),
  endpoints: (builder) => ({
    getSearchCards: builder.query<Card[], string>({
      query: (inputValue: string) => `/cards/named?fuzzy=${inputValue}`,
    }),
  }),
});

export const { useGetSearchCardsQuery } = magicApi;

// заготовка
