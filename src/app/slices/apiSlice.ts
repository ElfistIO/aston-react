import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";

import * as Scry from "scryfall-sdk";

interface QueryArgument {
  identifiers: DocumentData[] | undefined;
}
interface List {
  data: Array<Scry.Card>;
  has_more: Boolean;
  next_page: string | null;
  total_cards: number | null;
  warnings: Array<string>;
}

export const magicApi = createApi({
  reducerPath: "magicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.scryfall.com" }),
  endpoints: (builder) => ({
    getCollection: builder.query({
      query: (userCollection: QueryArgument) => ({
        url: `/cards/collection`,
        method: "post",
        contentType: "application/json",
        body: userCollection,
      }),
      transformResponse(response: List) {
        if (response.next_page) {
          return {
            data: response.data,
            // .slice(0, 75)
            next_page: response.next_page,
          };
        } else
          return {
            data: response.data.sort((a, b) => a.name.localeCompare(b.name)),
          };
      },
    }),
  }),
});

export const { useGetCollectionQuery } = magicApi;
