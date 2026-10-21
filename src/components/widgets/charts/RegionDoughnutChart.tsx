import { useMemo } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { palette } from '@/lib/chartSetup';
import type { ChartSeries } from '@/types/dashboard';
import { useTheme } from '@/context/ThemeContext';

interface RegionDoughnutChartProps {
  series: ChartSeries;
}

export const RegionDoughnutChart = ({ series }: RegionDoughnutChartProps) => {
  const { theme } = useTheme();
  const data = useMemo<ChartData<'doughnut'>>(
    () => ({
      labels: series.labels,
      datasets: [
        {
          data: series.values,
          backgroundColor: series.labels.map((_, index) => palette.regions[index % palette.regions.length]),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    }),
    [series],
  );

  const options = useMemo<ChartOptions<'doughnut'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: theme === 'dark' ? '#eaf6fa' : '#10313f', boxWidth: 12, boxHeight: 12 },
        },
        tooltip: { callbacks: { label: item => ` ${item.label}: ${item.parsed} countries` } },
      },
    }),
    [theme],
  );

  return (
    <div className="chart-box">
      <Doughnut data={data} options={options} />
    </div>
  );
};
