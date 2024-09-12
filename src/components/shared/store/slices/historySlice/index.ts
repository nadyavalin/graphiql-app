import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HistoryRequest {
  date: string;
  url: string;
  encodeUrl: string;
}

interface HistoryState {
  listRequestsRestClient: HistoryRequest[];
  listRequestsGraphQL: HistoryRequest[];
}

const initialState: HistoryState = {
  listRequestsRestClient: [],
  listRequestsGraphQL: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addRequestRestClient(state, action: PayloadAction<HistoryRequest>) {
      state.listRequestsRestClient = [...state.listRequestsRestClient, action.payload];
    },
    addRequestGraphQL(state, action: PayloadAction<HistoryRequest>) {
      state.listRequestsGraphQL = [...state.listRequestsGraphQL, action.payload];
    },
  },
});

export const { addRequestRestClient, addRequestGraphQL } = historySlice.actions;
export default historySlice.reducer;
