import { useRef } from 'react';
import { Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import type { ChartData } from '../data/writingPrompts';

interface ChartRendererProps {
  chartData: ChartData;
  darkMode?: boolean;
}

export default function ChartRenderer({ chartData, darkMode = false }: ChartRendererProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        scale: 2
      });

      const link = document.createElement('a');
      link.download = `ielts-chart-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const colors = chartData.options?.colors || ['#0D9488', '#3B82F6', '#8B5CF6', '#10B981', '#DC2626'];
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? '#374151' : '#E5E7EB';

  const renderBarChart = () => {
    const { data, options } = chartData;
    const xKey = options?.xKey || 'name';
    const dataKeys = options?.dataKeys || [options?.yKey || 'value'];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={xKey} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: '8px'
            }}
          />
          <Legend />
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[idx % colors.length]}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderLineChart = () => {
    const { data, options } = chartData;
    const xKey = options?.xKey || 'name';
    const dataKeys = options?.dataKeys || ['value'];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={xKey} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: '8px'
            }}
          />
          <Legend />
          {dataKeys.map((key, idx) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[idx % colors.length]}
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    const { data } = chartData;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderProcessDiagram = () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 400">
        {/* Process Flow Example */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colors[0]} />
          </marker>
        </defs>

        {/* Step 1 */}
        <rect x="50" y="50" width="120" height="80" rx="8" fill={colors[0]} opacity="0.8" />
        <text x="110" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Step 1
        </text>

        {/* Arrow */}
        <line
          x1="170"
          y1="90"
          x2="230"
          y2="90"
          stroke={colors[0]}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Step 2 */}
        <rect x="230" y="50" width="120" height="80" rx="8" fill={colors[1]} opacity="0.8" />
        <text x="290" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Step 2
        </text>

        {/* Arrow */}
        <line
          x1="350"
          y1="90"
          x2="410"
          y2="90"
          stroke={colors[1]}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Step 3 */}
        <rect x="410" y="50" width="120" height="80" rx="8" fill={colors[2]} opacity="0.8" />
        <text x="470" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Step 3
        </text>

        {/* Arrow Down */}
        <line
          x1="470"
          y1="130"
          x2="470"
          y2="190"
          stroke={colors[2]}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Step 4 */}
        <rect x="410" y="190" width="120" height="80" rx="8" fill={colors[3]} opacity="0.8" />
        <text x="470" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Step 4
        </text>

        <text x="400" y="330" textAnchor="middle" fill={textColor} fontSize="12">
          Process Flow Diagram
        </text>
      </svg>
    </div>
  );

  const renderMapDiagram = () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 400">
        {/* Simple map representation */}
        <rect x="50" y="50" width="300" height="300" fill={darkMode ? '#374151' : '#E5E7EB'} rx="8" />
        <text x="200" y="210" textAnchor="middle" fill={textColor} fontSize="16" fontWeight="bold">
          BEFORE
        </text>

        {/* Buildings */}
        <rect x="100" y="100" width="50" height="50" fill={colors[0]} opacity="0.7" />
        <rect x="180" y="100" width="50" height="50" fill={colors[1]} opacity="0.7" />
        <rect x="260" y="100" width="50" height="50" fill={colors[2]} opacity="0.7" />

        <rect x="450" y="50" width="300" height="300" fill={darkMode ? '#374151' : '#E5E7EB'} rx="8" />
        <text x="600" y="210" textAnchor="middle" fill={textColor} fontSize="16" fontWeight="bold">
          AFTER
        </text>

        {/* New layout */}
        <rect x="500" y="100" width="80" height="80" fill={colors[3]} opacity="0.7" />
        <rect x="600" y="100" width="80" height="80" fill={colors[4]} opacity="0.7" />
        <circle cx="550" cy="250" r="30" fill={colors[0]} opacity="0.7" />

        <text x="400" y="380" textAnchor="middle" fill={textColor} fontSize="12">
          Map Comparison
        </text>
      </svg>
    </div>
  );

  const renderChart = () => {
    switch (chartData.type) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      case 'process':
        return renderProcessDiagram();
      case 'map':
        return renderMapDiagram();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {chartData.options?.title || 'Interactive Chart'}
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export PNG</span>
        </button>
      </div>

      <div ref={chartRef} className="w-full">
        {renderChart()}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Interactive visualization • Hover for details • Export available
      </p>
    </div>
  );
}
