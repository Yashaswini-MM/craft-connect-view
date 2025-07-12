
import React, { useState } from 'react';
import { Play, Clock, Eye, Star, User, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for the assigned video based on current order
const assignedVideo = {
  id: 1,
  title: 'Wooden Chair Assembly - Model A',
  description: 'Complete step-by-step guide for assembling Model A wooden chairs with quality control checkpoints',
  duration: '24:15',
  views: 1456,
  rating: 4.9,
  orderReference: 'ORD-2024-001',
  thumbnail: '/placeholder.svg',
  uploadedBy: 'Production Manager',
  uploadDate: '2024-01-18',
  completed: false,
  sections: [
    { id: 1, title: 'Safety Preparation', timestamp: '0:00', duration: '2:30' },
    { id: 2, title: 'Wood Preparation & Inspection', timestamp: '2:30', duration: '3:45' },
    { id: 3, title: 'Joint Assembly Techniques', timestamp: '6:15', duration: '5:20' },
    { id: 4, title: 'Hardware Installation', timestamp: '11:35', duration: '4:15' },
    { id: 5, title: 'Quality Control Checkpoints', timestamp: '15:50', duration: '6:10' },
    { id: 6, title: 'Final Assembly & Testing', timestamp: '22:00', duration: '2:15' }
  ]
};

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleSectionClick = (sectionId: number) => {
    setSelectedSection(sectionId);
    console.log(`Jumping to section ${sectionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Video Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{assignedVideo.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Order Reference: {assignedVideo.orderReference}
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Required Training
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {assignedVideo.uploadedBy}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(assignedVideo.uploadDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {assignedVideo.duration}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {assignedVideo.views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {assignedVideo.rating}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Video Player */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform" 
                       onClick={() => setIsPlaying(!isPlaying)} />
                  <p className="text-lg font-medium">{assignedVideo.title}</p>
                  <p className="text-sm opacity-75">Click to start training video</p>
                </div>
                
                {/* Video overlay with duration */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-black/70 text-white">
                    {assignedVideo.duration}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Video Description */}
          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">About This Training</h2>
              <p className="text-gray-600">{assignedVideo.description}</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Training Requirements</h4>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Watch the complete video before starting production</li>
                    <li>• Pay special attention to quality control checkpoints</li>
                    <li>• Refer back to specific sections as needed during production</li>
                    <li>• Contact supervisor if any steps are unclear</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Sections */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Sections</CardTitle>
              <p className="text-sm text-gray-600">Jump to specific parts of the training</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignedVideo.sections.map((section) => (
                <div 
                  key={section.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSection === section.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{section.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {section.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">Start at {section.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video Completion</span>
                  <span className="text-sm font-medium">
                    {assignedVideo.completed ? '100%' : '0%'}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      assignedVideo.completed ? 'bg-green-500 w-full' : 'bg-blue-500 w-0'
                    }`}
                  ></div>
                </div>
                
                <Button 
                  variant={assignedVideo.completed ? "secondary" : "default"}
                  className="w-full mt-4"
                  onClick={() => console.log('Mark video as completed')}
                >
                  {assignedVideo.completed ? 'Training Completed ✓' : 'Mark as Completed'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
