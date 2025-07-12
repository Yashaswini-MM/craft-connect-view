import React, { useState } from 'react';
import { Play, Clock, Eye, Star, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: 'Basic Woodworking Techniques',
    description: 'Learn fundamental woodworking skills and safety procedures',
    duration: '12:45',
    views: 1234,
    rating: 4.8,
    category: 'Fundamentals',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-15',
    completed: false
  },
  {
    id: 2,
    title: 'Advanced Joinery Methods',
    description: 'Master complex joinery techniques for professional results',
    duration: '18:30',
    views: 856,
    rating: 4.9,
    category: 'Advanced',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-10',
    completed: true
  },
  {
    id: 3,
    title: 'Safety Protocols & Best Practices',
    description: 'Essential safety guidelines for workshop operations',
    duration: '8:15',
    views: 2156,
    rating: 4.7,
    category: 'Safety',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-12',
    completed: false
  },
  {
    id: 4,
    title: 'Tool Maintenance Guide',
    description: 'Keep your tools in perfect condition with proper maintenance',
    duration: '15:20',
    views: 934,
    rating: 4.6,
    category: 'Maintenance',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-08',
    completed: false
  },
  {
    id: 5,
    title: 'Quality Control Standards',
    description: 'Understanding and implementing quality control measures',
    duration: '22:10',
    views: 1567,
    rating: 4.9,
    category: 'Quality',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-05',
    completed: true
  },
  {
    id: 6,
    title: 'Project Planning & Execution',
    description: 'Effective project management for artisan work',
    duration: '16:45',
    views: 723,
    rating: 4.5,
    category: 'Management',
    thumbnail: '/placeholder.svg',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-03',
    completed: false
  }
];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Fundamentals', 'Advanced', 'Safety', 'Maintenance', 'Quality', 'Management'];

  const filteredVideos = mockVideos.filter(video => 
    filterCategory === 'all' || video.category === filterCategory
  );

  const VideoCard = ({ video, isCompact = false }: { video: typeof mockVideos[0], isCompact?: boolean }) => (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
        video.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
      } ${isCompact ? 'flex' : ''}`}
      onClick={() => setSelectedVideo(video.id)}
    >
      <div className={`relative ${isCompact ? 'w-48 flex-shrink-0' : 'aspect-video'}`}>
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play className="w-12 h-12 text-white" />
        </div>
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-black/70 text-white text-xs"
        >
          {video.duration}
        </Badge>
        {video.completed && (
          <Badge 
            variant="default" 
            className="absolute top-2 left-2 bg-green-600 text-white text-xs"
          >
            Completed
          </Badge>
        )}
      </div>
      
      <CardContent className={`${isCompact ? 'flex-1' : ''} p-4`}>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {video.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {video.rating}
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>
          </div>
          <span>By {video.uploadedBy}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedVideo) {
    const video = mockVideos.find(v => v.id === selectedVideo);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedVideo(null)}
            className="mb-4"
          >
            ← Back to Videos
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">{video?.title}</p>
                  <p className="text-sm opacity-75">Video Player Placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{video?.title}</h1>
              <p className="text-gray-600">{video?.description}</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {video?.views.toLocaleString()} views
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {video?.duration}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {video?.rating} rating
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Badge variant="secondary" className="text-sm">
            {filteredVideos.length} videos
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredVideos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            isCompact={viewMode === 'list'}
          />
        ))}
      </div>
    </div>
  );
}
