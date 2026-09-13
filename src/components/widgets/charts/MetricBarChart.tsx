import { useMemo } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { axisColors, palette } from '@/lib/chartSetup';
import { formatCompact } from '@/lib/format';
import type { ChartSeries } from '@/types/dashboard';
import { useTheme } from '@/context/ThemeContext';

interface MetricBarChartProps {
  series: ChartSeries;
}

export const MetricBarChart = ({ series }: MetricBarChartProps) => {
  const { theme } = useTheme();
  const data = useMemo<ChartData<'bar'>>(
    () => ({
      labels: series.labels,
      datasets: [
        {
          label: series.unit,
          data: series.values,
          backgroundColor: palette.bar,
          borderColor: palette.barBorder,
          borderWidth: 1,
          borderRadius: 5,
          maxBarThickness: 36,
        },
      ],
    }),
    [series],
  );

  const options = useMemo<ChartOptions<'bar'>>(() => {
    const colors = axisColors(theme);
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: item => ` ${item.parsed.y?.toLocaleString('en-US')} ${series.unit}` } },
      },
      scales: {
        x: { ticks: { color: colors.tick }, grid: { display: false } },
        y: { ticks: { color: colors.tick, callback: value => formatCompact(Number(value)) }, grid: { color: colors.grid } },
      },
    };
  }, [series.unit, theme]);

  return (
    <div className="chart-box">
      <Bar data={data} options={options} />
    </div>
  );
};
