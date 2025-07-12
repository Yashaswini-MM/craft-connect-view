
import React, { useState } from 'react';
import { AlertTriangle, Clock, User, Calendar, Package, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for current order checklist
const currentOrder = {
  id: 'ORD-2024-001',
  productName: 'Wooden Chair - Model A',
  quantity: 100,
  assignedDate: '2024-01-20',
  dueDate: '2024-01-25',
  priority: 'high',
  orderStatus: 'in-progress',
  completedItems: 45,
  qualityControlSteps: [
    { id: 1, text: 'Check wood grain alignment and consistency', critical: true },
    { id: 2, text: 'Verify all joints are properly fitted', critical: true },
    { id: 3, text: 'Inspect for any cracks or splits in wood', critical: true },
    { id: 4, text: 'Check screw holes are properly aligned', critical: true },
    { id: 5, text: 'Verify all hardware is present and correct', critical: true },
    { id: 6, text: 'Test joint stability and strength', critical: true },
    { id: 7, text: 'Check for any gaps in joints', critical: false },
    { id: 8, text: 'Inspect surface smoothness', critical: false },
    { id: 9, text: 'Verify dimensions match specifications', critical: true },
    { id: 10, text: 'Check for any mismatched threading', critical: true },
    { id: 11, text: 'Inspect finish quality and consistency', critical: false },
    { id: 12, text: 'Test weight capacity (sample testing)', critical: true },
    { id: 13, text: 'Check for any loose components', critical: true },
    { id: 14, text: 'Verify color consistency', critical: false },
    { id: 15, text: 'Final visual inspection for defects', critical: false }
  ]
};

export function ChecklistSection() {
  const progressPercentage = (currentOrder.completedItems / currentOrder.quantity) * 100;
  const criticalSteps = currentOrder.qualityControlSteps.filter(step => step.critical).length;
  const totalSteps = currentOrder.qualityControlSteps.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{currentOrder.productName}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Order ID: {currentOrder.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(currentOrder.priority)}>
                {currentOrder.priority.toUpperCase()} PRIORITY
              </Badge>
              <Badge className={getStatusColor(currentOrder.orderStatus)}>
                {currentOrder.orderStatus.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Production Progress */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Production Progress</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed: {currentOrder.completedItems}/{currentOrder.quantity}</span>
                  <span className="font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-medium">Timeline</span>
              </div>
              <div className="text-sm space-y-1">
                <div>Started: {new Date(currentOrder.assignedDate).toLocaleDateString()}</div>
                <div>Due: {new Date(currentOrder.dueDate).toLocaleDateString()}</div>
                <div className="text-red-600 font-medium">
                  {Math.ceil((new Date(currentOrder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                </div>
              </div>
            </div>

            {/* Quality Steps Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Quality Control</span>
              </div>
              <div className="text-sm space-y-1">
                <div>Total Steps: {totalSteps}</div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Critical Steps: {criticalSteps}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Control Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Quality Control Checklist
          </CardTitle>
          <p className="text-sm text-gray-600">
            Follow these steps for each of the {currentOrder.quantity} units in this order
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentOrder.qualityControlSteps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                  step.critical 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">{step.id}</span>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{step.text}</p>
                  {step.critical && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">Critical Step</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Important Reminders</h4>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Each unit must pass all critical steps before proceeding</li>
                  <li>• Report any defects or quality issues immediately</li>
                  <li>• Document any recurring issues for process improvement</li>
                  <li>• Keep track of completed units in your production log</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
