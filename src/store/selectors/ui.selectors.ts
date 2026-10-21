import type { RootState } from '../index';

export const selectChartType = (state: RootState) => state.ui.chartType;
export const selectSelectedMetric = (state: RootState) => state.ui.selectedMetric;