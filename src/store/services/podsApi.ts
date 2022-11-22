import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants";
import type { Pod } from "../../types";

export const podsApi = createApi({
  reducerPath: "podsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Pod"],
  endpoints: (builder) => ({
    getPods: builder.query<Pod[], void>({
      query: () => ({
        url: "/pods",
      }),
      providesTags: ["Pod"],
    }),
    replacePods: builder.mutation<{ initializing: Pod, terminating: Pod }, string>({
      query: (uid) => ({
        url: `/pods/${uid}`,
        method: "PUT",
      }),
      // TODO: uncomment this line to enable refetching data when api is available
      // invalidatesTags: ["Pod"],

      // TODO: the code below is using only while we mock api
      // in case of using rtk query with real api the data will be automatically refetched
      // unce we update a pod
      async onQueryStarted(uid, { dispatch, queryFulfilled }) {
        try {
          const { data: { initializing, terminating} } = await queryFulfilled;
          dispatch(
            podsApi.util.updateQueryData("getPods", undefined, (draft) => {
              const podToUpdateIndex = draft.findIndex((pod) => pod.uid === uid);
              if (draft[podToUpdateIndex]) {
                draft[podToUpdateIndex].status = terminating.status;
                draft.push({
                  ...initializing,
                  uptime: null,
                  commit: draft[podToUpdateIndex].commit,
                  cluster: draft[podToUpdateIndex].cluster,
                });
              }
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
  })
});

export const { useGetPodsQuery, useReplacePodsMutation } = podsApi;
