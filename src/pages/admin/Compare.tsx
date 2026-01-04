import { useState, useMemo, useCallback } from 'react';
import { KPICard } from '@/components/admin/KPICard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  GraduationCap,
  Building2,
  BookOpen,
  Layers,
  X,
  Search,
  AlertCircle,
  Download,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';
import { universities, programs, batches, students } from '@/data/seedData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ComparisonType = 'universities' | 'programs' | 'batches' | 'students';

interface EntityOption {
  id: string;
  name: string;
  subtitle: string;
  data: {
    avgScore: number;
    completion: number;
    attendance: number;
    studentsCount?: number;
    examAvg?: number;
    assignmentCompletion?: number;
  };
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(142, 76%, 36%)',
  'hsl(280, 65%, 60%)',
];

const COLOR_NAMES = ['primary', 'success', 'warning', 'info', 'green', 'purple'];

export default function Compare() {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('universities');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get available entities based on comparison type
  const availableEntities: EntityOption[] = useMemo(() => {
    switch (comparisonType) {
      case 'universities':
        return universities.map(u => ({
          id: u.id,
          name: u.name,
          subtitle: `${u.studentsCount.toLocaleString()} students`,
          data: {
            avgScore: u.avgScore,
            completion: u.completion,
            attendance: u.attendance,
            studentsCount: u.studentsCount,
          }
        }));
      case 'programs':
        return programs.map(p => ({
          id: p.key,
          name: p.name,
          subtitle: `${p.studentsCount.toLocaleString()} students`,
          data: {
            avgScore: p.avgScore,
            completion: p.completion,
            attendance: p.attendance,
            studentsCount: p.studentsCount,
          }
        }));
      case 'batches':
        return batches.map(b => ({
          id: b.id,
          name: b.name,
          subtitle: `${b.sectionsCount} sections`,
          data: {
            avgScore: b.avgScore,
            completion: b.completion,
            attendance: b.attendance,
            studentsCount: b.sectionsCount * 30, // approximate
          }
        }));
      case 'students':
        return students.map(s => ({
          id: s.id,
          name: s.name,
          subtitle: s.email,
          data: {
            avgScore: s.avgScore,
            completion: s.completion,
            attendance: s.attendance,
            examAvg: s.examAvg,
            assignmentCompletion: s.assignmentCompletion,
          }
        }));
      default:
        return [];
    }
  }, [comparisonType]);

  // Filter entities based on search
  const filteredEntities = useMemo(() => {
    if (!searchQuery) return availableEntities;
    const query = searchQuery.toLowerCase();
    return availableEntities.filter(
      e => e.name.toLowerCase().includes(query) || e.subtitle.toLowerCase().includes(query)
    );
  }, [availableEntities, searchQuery]);

  // Get selected entities
  const selectedEntities = useMemo(() => {
    return availableEntities.filter(e => selectedIds.includes(e.id));
  }, [availableEntities, selectedIds]);

  // Handle type change - reset selections
  const handleTypeChange = (type: ComparisonType) => {
    setComparisonType(type);
    setSelectedIds([]);
    setSearchQuery('');
  };

  // Toggle entity selection
  const toggleEntity = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : prev.length < 6 ? [...prev, id] : prev
    );
  };

  // Remove entity
  const removeEntity = (id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedIds([]);
  };

  // Chart data for bar chart
  const barChartData = useMemo(() => {
    return [
      {
        metric: 'Avg Score',
        ...Object.fromEntries(selectedEntities.map((e, i) => [e.name, e.data.avgScore]))
      },
      {
        metric: 'Completion',
        ...Object.fromEntries(selectedEntities.map((e, i) => [e.name, e.data.completion]))
      },
      {
        metric: 'Attendance',
        ...Object.fromEntries(selectedEntities.map((e, i) => [e.name, e.data.attendance]))
      }
    ];
  }, [selectedEntities]);

  // Radar chart data
  const radarChartData = useMemo(() => {
    const metrics = ['Avg Score', 'Completion', 'Attendance'];
    if (comparisonType === 'students') {
      metrics.push('Exam Avg', 'Assignment');
    }
    
    return metrics.map(metric => {
      const dataPoint: Record<string, string | number> = { metric };
      selectedEntities.forEach(e => {
        switch (metric) {
          case 'Avg Score':
            dataPoint[e.name] = e.data.avgScore;
            break;
          case 'Completion':
            dataPoint[e.name] = e.data.completion;
            break;
          case 'Attendance':
            dataPoint[e.name] = e.data.attendance;
            break;
          case 'Exam Avg':
            dataPoint[e.name] = e.data.examAvg || 0;
            break;
          case 'Assignment':
            dataPoint[e.name] = e.data.assignmentCompletion || 0;
            break;
        }
      });
      return dataPoint;
    });
  }, [selectedEntities, comparisonType]);

  // Trend data (simulated monthly data)
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => {
      const dataPoint: Record<string, string | number> = { month };
      selectedEntities.forEach(e => {
        // Simulate trend with some variation
        const base = e.data.avgScore;
        const variation = Math.sin(idx * 0.5) * 5 + (idx * 1.5);
        dataPoint[e.name] = Math.min(100, Math.max(0, base - 10 + variation + idx * 2));
      });
      return dataPoint;
    });
  }, [selectedEntities]);

  // Chart config for ChartContainer
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    selectedEntities.forEach((e, i) => {
      config[e.name] = {
        label: e.name,
        color: COLORS[i % COLORS.length],
      };
    });
    return config;
  }, [selectedEntities]);

  // Export to CSV
  const exportToCSV = useCallback(() => {
    if (selectedEntities.length < 2) return;

    const headers = ['Metric', ...selectedEntities.map(e => e.name)];
    const rows = [
      ['Average Score (%)', ...selectedEntities.map(e => e.data.avgScore.toString())],
      ['Completion Rate (%)', ...selectedEntities.map(e => e.data.completion.toString())],
      ['Attendance (%)', ...selectedEntities.map(e => e.data.attendance.toString())],
    ];

    if (comparisonType === 'students') {
      rows.push(
        ['Exam Average (%)', ...selectedEntities.map(e => (e.data.examAvg || 0).toString())],
        ['Assignment Completion (%)', ...selectedEntities.map(e => (e.data.assignmentCompletion || 0).toString())]
      );
    } else {
      rows.push(
        [comparisonType === 'batches' ? 'Sections' : 'Students', 
         ...selectedEntities.map(e => (e.data.studentsCount || 0).toString())]
      );
    }

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `comparison-${comparisonType}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('CSV exported successfully');
  }, [selectedEntities, comparisonType]);

  // Export to PDF (generates a printable HTML that opens in new window)
  const exportToPDF = useCallback(() => {
    if (selectedEntities.length < 2) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comparison Report - ${comparisonType}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1a1a2e; }
          h1 { color: #5B4CDB; margin-bottom: 8px; }
          .subtitle { color: #666; margin-bottom: 32px; }
          .date { color: #888; font-size: 14px; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px 16px; text-align: left; }
          th { background: linear-gradient(135deg, #5B4CDB, #8B5CF6); color: white; }
          tr:nth-child(even) { background: #f8fafc; }
          .metric { font-weight: 500; color: #374151; }
          .value { font-weight: 600; color: #1a1a2e; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Performance Comparison Report</h1>
        <p class="subtitle">Comparing ${selectedEntities.length} ${comparisonType}</p>
        <p class="date">Generated on ${new Date().toLocaleDateString('en-US', { 
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        })}</p>
        
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              ${selectedEntities.map(e => `<th>${e.name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="metric">Average Score</td>
              ${selectedEntities.map(e => `<td class="value">${e.data.avgScore}%</td>`).join('')}
            </tr>
            <tr>
              <td class="metric">Completion Rate</td>
              ${selectedEntities.map(e => `<td class="value">${e.data.completion}%</td>`).join('')}
            </tr>
            <tr>
              <td class="metric">Attendance</td>
              ${selectedEntities.map(e => `<td class="value">${e.data.attendance}%</td>`).join('')}
            </tr>
            ${comparisonType === 'students' ? `
              <tr>
                <td class="metric">Exam Average</td>
                ${selectedEntities.map(e => `<td class="value">${e.data.examAvg || '-'}%</td>`).join('')}
              </tr>
              <tr>
                <td class="metric">Assignment Completion</td>
                ${selectedEntities.map(e => `<td class="value">${e.data.assignmentCompletion || '-'}%</td>`).join('')}
              </tr>
            ` : `
              <tr>
                <td class="metric">${comparisonType === 'batches' ? 'Sections' : 'Students'}</td>
                ${selectedEntities.map(e => `<td class="value">${(e.data.studentsCount || 0).toLocaleString()}</td>`).join('')}
              </tr>
            `}
          </tbody>
        </table>
        
        <div class="footer">
          <p>This report was generated from the Admin Console comparison tool.</p>
        </div>
        
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      toast.success('PDF report opened - use Print to save as PDF');
    }
  }, [selectedEntities, comparisonType]);

  const getTypeIcon = (type: ComparisonType) => {
    switch (type) {
      case 'universities': return Building2;
      case 'programs': return BookOpen;
      case 'batches': return Layers;
      case 'students': return Users;
    }
  };

  const TypeIcon = getTypeIcon(comparisonType);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Compare Performance</h1>
          <p className="text-muted-foreground mt-1">Select entities to compare performance metrics side by side</p>
        </div>
        {selectedIds.length >= 2 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
                <FileSpreadsheet className="w-4 h-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="gap-2 cursor-pointer">
                <FileText className="w-4 h-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Comparison Type Tabs */}
      <div className="glass-card p-4">
        <Tabs value={comparisonType} onValueChange={(v) => handleTypeChange(v as ComparisonType)}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="universities" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Universities</span>
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Programs</span>
            </TabsTrigger>
            <TabsTrigger value="batches" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Batches</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Selection Panel */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">
              Select {comparisonType.charAt(0).toUpperCase() + comparisonType.slice(1)} to Compare
            </h2>
            <Badge variant="secondary" className="ml-2">
              {selectedIds.length} / 6 selected
            </Badge>
          </div>
          {selectedIds.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {/* Selected Items */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedEntities.map((entity, idx) => (
              <Badge
                key={entity.id}
                variant="outline"
                className="px-3 py-1.5 text-sm flex items-center gap-2"
                style={{ borderColor: COLORS[idx % COLORS.length], color: COLORS[idx % COLORS.length] }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                {entity.name}
                <button
                  onClick={() => removeEntity(entity.id)}
                  className="hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${comparisonType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Entity List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {filteredEntities.map((entity) => {
            const isSelected = selectedIds.includes(entity.id);
            const selectedIndex = selectedIds.indexOf(entity.id);
            return (
              <div
                key={entity.id}
                onClick={() => toggleEntity(entity.id)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-border hover:border-primary/30 hover:bg-muted/50'
                  }
                  ${!isSelected && selectedIds.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={!isSelected && selectedIds.length >= 6}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{entity.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{entity.subtitle}</p>
                </div>
                {isSelected && (
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[selectedIndex % COLORS.length] }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Results */}
      {selectedIds.length < 2 ? (
        <div className="glass-card p-12 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select at least 2 items</h3>
          <p className="text-muted-foreground">
            Choose 2 or more {comparisonType} from the list above to see the comparison
          </p>
        </div>
      ) : (
        <>
          {/* KPI Cards Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedEntities.map((entity, idx) => (
              <div key={entity.id} className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <h3 className="font-semibold text-foreground truncate">{entity.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                    <p className="text-lg font-bold text-foreground">{entity.data.avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="text-lg font-bold text-foreground">{entity.data.completion}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className="text-lg font-bold text-foreground">{entity.data.attendance}%</p>
                  </div>
                  {entity.data.studentsCount && (
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="text-lg font-bold text-foreground">{entity.data.studentsCount.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart Comparison */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Metrics Comparison</h3>
              </div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="metric" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {selectedEntities.map((entity, idx) => (
                    <Bar
                      key={entity.id}
                      dataKey={entity.name}
                      fill={COLORS[idx % COLORS.length]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ChartContainer>
            </div>

            {/* Radar Chart */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Performance Radar</h3>
              </div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RadarChart data={radarChartData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid className="stroke-border" />
                  <PolarAngleAxis dataKey="metric" className="text-xs" />
                  <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {selectedEntities.map((entity, idx) => (
                    <Radar
                      key={entity.id}
                      name={entity.name}
                      dataKey={entity.name}
                      stroke={COLORS[idx % COLORS.length]}
                      fill={COLORS[idx % COLORS.length]}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ChartContainer>
            </div>

            {/* Trend Line Chart */}
            <div className="glass-card p-5 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Performance Trend (6 Months)</h3>
              </div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {selectedEntities.map((entity, idx) => (
                    <Line
                      key={entity.id}
                      type="monotone"
                      dataKey={entity.name}
                      stroke={COLORS[idx % COLORS.length]}
                      strokeWidth={2}
                      dot={{ fill: COLORS[idx % COLORS.length], r: 4 }}
                    />
                  ))}
                </LineChart>
              </ChartContainer>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Detailed Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Metric</th>
                    {selectedEntities.map((entity, idx) => (
                      <th key={entity.id} className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          <span className="text-sm font-medium text-foreground">{entity.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-muted-foreground">Average Score</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="text-center py-3 px-4">
                        <span className="font-semibold text-foreground">{entity.data.avgScore}%</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-muted-foreground">Completion Rate</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="text-center py-3 px-4">
                        <span className="font-semibold text-foreground">{entity.data.completion}%</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-muted-foreground">Attendance</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="text-center py-3 px-4">
                        <span className="font-semibold text-foreground">{entity.data.attendance}%</span>
                      </td>
                    ))}
                  </tr>
                  {comparisonType === 'students' && (
                    <>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-sm text-muted-foreground">Exam Average</td>
                        {selectedEntities.map((entity) => (
                          <td key={entity.id} className="text-center py-3 px-4">
                            <span className="font-semibold text-foreground">{entity.data.examAvg || '-'}%</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-sm text-muted-foreground">Assignment Completion</td>
                        {selectedEntities.map((entity) => (
                          <td key={entity.id} className="text-center py-3 px-4">
                            <span className="font-semibold text-foreground">{entity.data.assignmentCompletion || '-'}%</span>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                  {comparisonType !== 'students' && (
                    <tr>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {comparisonType === 'batches' ? 'Sections' : 'Students'}
                      </td>
                      {selectedEntities.map((entity) => (
                        <td key={entity.id} className="text-center py-3 px-4">
                          <span className="font-semibold text-foreground">
                            {entity.data.studentsCount?.toLocaleString() || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
