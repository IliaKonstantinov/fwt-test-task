import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  paintings: [],
  locations: [],
  authors: [],
  currentPage: 1,
  perPage: 9,
  currentPaintings: [],
  pages: [],
  totalPages: [],
  theme: true,
};

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async () => {
    const res = await fetch('https://test-front.framework.team/paintings');
    const data = await res.json();
    return data;
  },
);

export const fetchAuthors = createAsyncThunk(
  'paintings/fetchAuchors',
  async () => {
    const res = await fetch('https://test-front.framework.team/authors');
    const data = await res.json();
    return data;
  },
);

export const fetchLocations = createAsyncThunk(
  'paintings/fetchLocations',
  async () => {
    const res = await fetch('https://test-front.framework.team/locations');
    const data = await res.json();
    return data;
  },
);

export const filterByName = createAsyncThunk(
  'paintings/filter',
  async (name) => {
    const res = await fetch(`https://test-front.framework.team/paintings?q=${name}`);
    const data = await res.json();
    return data;
  },
);

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    pageIncrement: (state) => {
      state.currentPage += 1;
    },
    pageDecrement: (state) => {
      state.currentPage -= 1;
    },
    firstPage: (state) => {
      state.currentPage = 1;
    },
    lastPage: (state) => {
      state.currentPage = state.totalPages.length;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTheme: (state) => {
      state.theme = !state.theme;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      for (let i = 0; i < Math.ceil(state.paintings.length / state.perPage); i += 1) {
        state.totalPages[i] = i + 1;
      }
      if (state.totalPages.length > Math.ceil(state.paintings.length / state.perPage)) {
        state.totalPages.length = Math.ceil(state.paintings.length / state.perPage);
      }
      state.currentPage = 1;
    },
    setPagination: (state) => {
      if (state.totalPages.length < 3) {
        state.pages.length = state.totalPages.length;
      } else if (state.totalPages.length >= 3) {
        state.pages.length = 3;
      }
      if (state.pages.length === 3) {
        if (state.currentPage === 1) {
          state.pages[0] = 1;
          state.pages[1] = 2;
          state.pages[2] = 3;
        } else if (state.currentPage === state.totalPages.length) {
          state.pages[0] = state.currentPage - 2;
          state.pages[1] = state.currentPage - 1;
          state.pages[2] = state.currentPage;
        } else {
          state.pages[0] = state.currentPage - 1;
          state.pages[1] = state.currentPage;
          state.pages[2] = state.currentPage + 1;
        }
      } else {
        state.pages[0] = 1;
        state.pages[1] = 2;
      }
    },
    paginatePaintings: (state) => {
      const lastPaintingIndex = state.currentPage * state.perPage;
      const firstPaintingIndex = lastPaintingIndex - state.perPage;
      state.currentPaintings = state.paintings.slice(firstPaintingIndex, lastPaintingIndex);
    },
  },
  extraReducers: {
    [fetchPaintings.fulfilled]: (state, action) => {
      state.paintings = action.payload;
      for (let i = 0; i < Math.ceil(state.paintings.length / state.perPage); i += 1) {
        state.totalPages[i] = i + 1;
      }
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.authors = action.payload;
    },
    [fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload;
    },
    [filterByName.fulfilled]: (state, action) => {
      state.paintings = action.payload;
      state.currentPage = 1;
      state.totalPages = [];
      for (let i = 0; i < Math.ceil(state.paintings.length / state.perPage); i += 1) {
        state.totalPages[i] = i + 1;
      }
    },
  },
});

export default paintingsSlice.reducer;
export const {
  setCurrentPage,
  paginatePaintings,
  pageIncrement,
  pageDecrement,
  firstPage,
  lastPage,
  setPerPage,
  setTheme,
  setPagination,
} = paintingsSlice.actions;
