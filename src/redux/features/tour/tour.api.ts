import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (payload) => ({
        url: `/tour/create-tour-type`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TOUR"],
    }),
    deleteTourType: builder.mutation({
      query: (id) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: `/tour/tour-types`,
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery, useDeleteTourTypeMutation } = tourApi;
