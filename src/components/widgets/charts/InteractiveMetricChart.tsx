import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectChartType, selectFavorites } from '@/store/selectors';
import { setChartType } from '@/store/slices/uiSlice';
import { axisColors, CHART_FAVORITE_COLORS, METRIC_UNITS } from '@/constants';
import { formatCompact } from '@/lib/format';
import { useTheme } from '@/context/ThemeContext';
import { metricValue } from '@/lib/aggregations';
import type { ChartSeries, ChartType, InteractiveMetricChartProps } from '@/types';

export const InteractiveMetricChart = ({ countries, metric, limit = 8 }: InteractiveMetricChartProps) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const chartType = useAppSelector(selectChartType);
  const favorites = useAppSelector(selectFavorites);

  const topCountries = useMemo(() => {
    return [...countries]
      .sort((a, b) => metricValue(b, metric) - metricValue(a, metric))
      .slice(0, limit);
  }, [countries, metric, limit]);

  const series: ChartSeries = useMemo(() => ({
    labels: topCountries.map(c => c.name),
    values: topCountries.map(c => Number(metricValue(c, metric).toFixed(1))),
    unit: METRIC_UNITS[metric],
  }), [topCountries, metric]);

  const { backgroundColors, borderColors, pointRadii } = useMemo(() => {
    const bg: string[] = [];
    const border: string[] = [];
    const radii: number[] = [];

    topCountries.forEach(c => {
      const isFav = favorites.includes(c.code.toUpperCase());
      if (isFav) {
        bg.push(CHART_FAVORITE_COLORS.bg);
        border.push(CHART_FAVORITE_COLORS.border);
        radii.push(8);
      } else {
        bg.push(CHART_FAVORITE_COLORS.defaultBg);
        border.push(CHART_FAVORITE_COLORS.defaultBorder);
        radii.push(5);
      }
    });

    return { backgroundColors: bg, borderColors: border, pointRadii: radii };
  }, [topCountries, favorites]);

  const data = useMemo<ChartData<ChartType>>(() => ({
    labels: series.labels,
    datasets: [
      {
        label: series.unit,
        data: series.values,
        backgroundColor: backgroundColors,
        borderColor: chartType === 'line' ? CHART_FAVORITE_COLORS.defaultBorder : borderColors,
        borderWidth: 2,
        borderRadius: 6,
        pointBackgroundColor: backgroundColors,
        pointBorderColor: borderColors,
        pointRadius: pointRadii,
        pointHoverRadius: 10,
        fill: chartType === 'line' ? { target: 'origin', above: CHART_FAVORITE_COLORS.lineFill } : false,
        tension: 0.35,
      },
    ],
  }), [series, backgroundColors, borderColors, pointRadii, chartType]);

  const options = useMemo<ChartOptions<ChartType>>(() => {
    const colors = axisColors(theme);
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: item => {
              const country = topCountries[item.dataIndex];
              const isFav = country ? favorites.includes(country.code.toUpperCase()) : false;
              const favMark = isFav ? ' ★ [Favorite]' : '';
              return ` ${item.parsed.y?.toLocaleString('en-US')} ${series.unit}${favMark}`;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: colors.tick }, grid: { display: false } },
        y: {
          ticks: { color: colors.tick, callback: value => formatCompact(Number(value)) },
          grid: { color: colors.grid },
        },
      },
    };
  }, [series.unit, theme, topCountries, favorites]);

  return (
    <div className="interactive-chart">
      <div className="interactive-chart__header">
        <div className="interactive-chart__legend-hint">
          <span className="fav-legend-dot" aria-hidden="true" />
          <span>★ Highlighted Favorites</span>
        </div>
        <div className="chart-type-tabs" role="group" aria-label="Chart type toggle">
          <button
            type="button"
            className={`chart-type-tab ${chartType === 'bar' ? 'is-active' : ''}`}
            onClick={() => dispatch(setChartType('bar'))}
          >
             Bar
          </button>
          <button
            type="button"
            className={`chart-type-tab ${chartType === 'line' ? 'is-active' : ''}`}
            onClick={() => dispatch(setChartType('line'))}
          >
             Line
          </button>
        </div>
      </div>

      <div className="chart-box">
        {chartType === 'bar' ? (
          <Bar data={data as ChartData<'bar'>} options={options as ChartOptions<'bar'>} />
        ) : (
          <Line data={data as ChartData<'line'>} options={options as ChartOptions<'line'>} />
        )}
      </div>
    </div>
  );
};