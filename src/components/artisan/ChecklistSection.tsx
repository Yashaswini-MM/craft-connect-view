
import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, Clock, CheckCircle, User, Calendar, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for checklists
const mockChecklists = [
  {
    id: 1,
    title: 'Daily Safety Inspection',
    description: 'Complete daily safety checks before starting work',
    category: 'Safety',
    priority: 'high',
    dueDate: '2024-01-20',
    assignedBy: 'Safety Manager',
    estimatedTime: '15 min',
    status: 'pending',
    completedAt: null,
    steps: [
      { id: 1, text: 'Check all safety equipment is present', completed: true, critical: true },
      { id: 2, text: 'Inspect work area for hazards', completed: true, critical: true },
      { id: 3, text: 'Verify emergency exits are clear', completed: false, critical: true },
      { id: 4, text: 'Test safety alarms', completed: false, critical: false },
      { id: 5, text: 'Document any safety concerns', completed: false, critical: false }
    ]
  },
  {
    id: 2,
    title: 'Quality Control - Furniture Assembly',
    description: 'Quality control steps for furniture assembly process',
    category: 'Quality',
    priority: 'medium',
    dueDate: '2024-01-22',
    assignedBy: 'Quality Manager',
    estimatedTime: '30 min',
    status: 'completed',
    completedAt: '2024-01-19T10:30:00Z',
    steps: [
      { id: 1, text: 'Check all joints are properly aligned', completed: true, critical: true },
      { id: 2, text: 'Verify all screws are tightened to specification', completed: true, critical: true },
      { id: 3, text: 'Test stability and weight capacity', completed: true, critical: true },
      { id: 4, text: 'Inspect finish quality', completed: true, critical: false },
      { id: 5, text: 'Clean and package for delivery', completed: true, critical: false }
    ]
  },
  {
    id: 3,
    title: 'Weekly Tool Maintenance',
    description: 'Regular maintenance schedule for workshop tools',
    category: 'Maintenance',
    priority: 'medium',
    dueDate: '2024-01-21',
    assignedBy: 'Workshop Supervisor',
    estimatedTime: '45 min',
    status: 'in-progress',
    completedAt: null,
    steps: [
      { id: 1, text: 'Clean all power tools', completed: true, critical: false },
      { id: 2, text: 'Check blade sharpness', completed: true, critical: true },
      { id: 3, text: 'Lubricate moving parts', completed: false, critical: true },
      { id: 4, text: 'Test safety features', completed: false, critical: true },
      { id: 5, text: 'Update maintenance log', completed: false, critical: false }
    ]
  },
  {
    id: 4,
    title: 'Project Documentation Review',
    description: 'Review and update project documentation',
    category: 'Documentation',
    priority: 'low',
    dueDate: '2024-01-25',
    assignedBy: 'Project Manager',
    estimatedTime: '20 min',
    status: 'pending',
    completedAt: null,
    steps: [
      { id: 1, text: 'Review project specifications', completed: false, critical: false },
      { id: 2, text: 'Update progress photos', completed: false, critical: false },
      { id: 3, text: 'Complete time tracking forms', completed: false, critical: false },
      { id: 4, text: 'Submit weekly report', completed: false, critical: false }
    ]
  }
];

export function ChecklistSection() {
  const [expandedChecklist, setExpandedChecklist] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const toggleChecklist = (id: number) => {
    setExpandedChecklist(expandedChecklist === id ? null : id);
  };

  const toggleStep = (checklistId: number, stepId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggle step ${stepId} in checklist ${checklistId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
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

  const getProgress = (steps: any[]) => {
    const completed = steps.filter(step => step.completed).length;
    return (completed / steps.length) * 100;
  };

  const filteredChecklists = mockChecklists.filter(checklist => {
    const statusMatch = filterStatus === 'all' || checklist.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || checklist.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const ChecklistCard = ({ checklist }: { checklist: typeof mockChecklists[0] }) => {
    const isExpanded = expandedChecklist === checklist.id;
    const progress = getProgress(checklist.steps);
    const completedSteps = checklist.steps.filter(step => step.completed).length;
    const criticalSteps = checklist.steps.filter(step => step.critical && !step.completed).length;

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
                {checklist.status.replace('-', ' ').toUpperCase()}
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
              
              {criticalSteps > 0 && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  {criticalSteps} critical
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {completedSteps}/{checklist.steps.length} steps</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {checklist.steps.map(step => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    step.completed 
                      ? 'bg-green-50 border-green-200' 
                      : step.critical 
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => toggleStep(checklist.id, step.id)}
                    className="flex-shrink-0"
                  >
                    {step.completed ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  
                  <span className={`flex-1 ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {step.text}
                  </span>
                  
                  {step.critical && !step.completed && (
                    <Badge variant="destructive" className="text-xs">
                      Critical
                    </Badge>
                  )}
                </div>
              ))}
              
              {checklist.status === 'completed' && checklist.completedAt && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Finished on {new Date(checklist.completedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockChecklists.length}
                </p>
                <p className="text-sm text-gray-600">Total Checklists</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockChecklists.filter(c => c.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockChecklists.filter(c => c.status === 'in-progress').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mockChecklists.filter(c => c.priority === 'high').length}
                </p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
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
