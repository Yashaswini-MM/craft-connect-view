import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, Clock, CheckCircle, User, Calendar, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for quality control checklists
const mockChecklists = [
  {
    id: 1,
    title: 'Furniture Assembly Quality Control',
    description: 'Quality control checklist for wooden chair assembly - Order #2024-001',
    category: 'Quality Control',
    priority: 'high',
    dueDate: '2024-01-20',
    assignedBy: 'Quality Manager',
    estimatedTime: '30 min per unit',
    status: 'active',
    productName: 'Wooden Dining Chair',
    orderQuantity: 100,
    completedUnits: 45,
    steps: [
      'Check wood grain alignment and surface smoothness',
      'Verify all joints are properly fitted without gaps',
      'Test screw tightness - torque to 25 Nm specification',
      'Inspect corner brackets for proper alignment',
      'Check seat stability and weight distribution',
      'Verify backrest angle matches specification (105°)',
      'Test all moving parts for smooth operation',
      'Inspect finish quality - no scratches or dents',
      'Check hardware mounting - all screws flush',
      'Verify product dimensions against technical drawing',
      'Test weight capacity up to 120kg specification',
      'Final visual inspection for overall quality'
    ]
  },
  {
    id: 2,
    title: 'Textile Quality Inspection',
    description: 'Quality control for cotton fabric production - Order #2024-002',
    category: 'Quality Control',
    priority: 'medium',
    dueDate: '2024-01-22',
    assignedBy: 'Production Supervisor',
    estimatedTime: '20 min per batch',
    status: 'active',
    productName: 'Cotton Fabric Roll',
    orderQuantity: 100,
    completedUnits: 78,
    steps: [
      'Check thread count consistency across the fabric',
      'Inspect for mismatched threads or color variations',
      'Verify fabric weight per square meter',
      'Test fabric strength and tear resistance',
      'Check for knots, loose threads, or weaving defects',
      'Inspect edge finishing and selvage quality',
      'Verify pattern alignment and print registration',
      'Test color fastness under standard conditions',
      'Check fabric width consistency throughout roll',
      'Inspect for oil stains or contamination'
    ]
  }
];

export function ChecklistSection() {
  const [expandedChecklist, setExpandedChecklist] = useState<number | null>(1);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const toggleChecklist = (id: number) => {
    setExpandedChecklist(expandedChecklist === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const filteredChecklists = mockChecklists.filter(checklist => {
    const statusMatch = filterStatus === 'all' || checklist.status === filterStatus;
    return statusMatch;
  });

  const ChecklistCard = ({ checklist }: { checklist: typeof mockChecklists[0] }) => {
    const isExpanded = expandedChecklist === checklist.id;
    const progress = getProgress(checklist.completedUnits, checklist.orderQuantity);

    return (
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleChecklist(checklist.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              <div>
                <CardTitle className="text-lg">{checklist.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{checklist.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(checklist.priority)}>
                {checklist.priority.toUpperCase()}
              </Badge>
              <Badge className={getStatusColor(checklist.status)}>
                {checklist.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {checklist.assignedBy}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {checklist.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: {new Date(checklist.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {checklist.completedUnits}/{checklist.orderQuantity} units completed</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">Current Order Details</div>
              <div className="text-sm text-blue-700">
                Product: {checklist.productName} | Quantity: {checklist.orderQuantity} units
              </div>
            </div>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Quality Control Steps</h4>
                <div className="space-y-2">
                  {checklist.steps.map((step, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-2 bg-white rounded border"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        <Badge variant="secondary" className="text-sm">
          {filteredChecklists.length} checklists
        </Badge>
      </div>

      {/* Checklists */}
      <div className="space-y-4">
        {filteredChecklists.map(checklist => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </div>
    </div>
  );
}
