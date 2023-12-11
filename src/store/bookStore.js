import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

export const useBookStore = create(
  devtools(
    persist(
      immer((set) => ({
        bookData: [],
        getAllBookAPI: async () => {
          try {
            const response = await axios.get("http://localhost:3008/books");
            set((state) => {
              state.bookData = response.data;
            });
          } catch (error) {
            console.error("Error fetching books:", error);
            // Handle the error, maybe set an error state in the store
          }
        },

        addBookAPI: async (payload) => {
          try {
            const response = await axios.post(
              "http://localhost:3008/books",
              payload
            );
            console.log(response);
            set((state) => {
              state.bookData.push(response.data);
            });
          } catch (error) {
            console.error("Error adding book:", error);
            // Handle the error, maybe set an error state in the store
          }
        },

        deleteBookAPI: async (id) => {
          try {
            await axios.delete(`http://localhost:3008/books/${id}`);
            set((state) => {
              state.bookData = state.bookData.filter((c) => c.id !== id);
            });
          } catch (error) {
            console.error("Error deleting book:", error);
            // Handle the error, maybe set an error state in the store
          }
        },

        EditBookAPI: async (payload) => {
          try {
            const response = await axios.put(
              `http://localhost:3008/books/${payload.id}`,
              payload
            );
            console.log(response.data);
            set((state) => {
              let bookState = state.bookData.filter((b) => b.id !== payload.id);
              bookState.push(response.data);
              state.bookData = bookState;
            });
          } catch (error) {
            console.error("Error editing book:", error);
            // Handle the error, maybe set an error state in the store
          }
        },
      })),
      {
        name: 'myPersistedStore', // Name for the storage key
        getStorage: () => localStorage, // Specify storage type (localStorage, sessionStorage, etc.)
      }
    )
  )
);
