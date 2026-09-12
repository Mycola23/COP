import { useMemo } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { palette } from '@/lib/chartSetup';
import type { ChartSeries, Theme } from '@/types/dashboard';

interface RegionDoughnutChartProps {
  series: ChartSeries;
  theme: Theme;
}

export const RegionDoughnutChart = ({ series, theme }: RegionDoughnutChartProps) => {
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
