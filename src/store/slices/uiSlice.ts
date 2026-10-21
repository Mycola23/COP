import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChartType, Metric, UiState } from '@/types';

const initialState: UiState = {
  chartType: 'bar',
  selectedMetric: 'population',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setChartType(state, action: PayloadAction<ChartType>) {
      state.chartType = action.payload;
    },
    setSelectedMetric(state, action: PayloadAction<Metric>) {
      state.selectedMetric = action.payload;
    },
  },
});

export const { setChartType, setSelectedMetric } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;