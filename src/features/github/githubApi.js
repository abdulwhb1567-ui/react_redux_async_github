import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getUserByUsername: builder.query({
      query: (username) => `users/${username}`,
    }),
    getUserRepos: builder.query({
      query: (username) => `users/${username}/repos`,
    }),
  }),
});

export const { useGetUserByUsernameQuery, useGetUserReposQuery } = githubApi;