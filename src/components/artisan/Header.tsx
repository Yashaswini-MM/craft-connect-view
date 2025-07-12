
import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ActiveSection } from '@/pages/ArtisanDashboard';

interface HeaderProps {
  activeSection: ActiveSection;
}

export function Header({ activeSection }: HeaderProps) {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'videos':
        return 'Training Videos';
      case 'checklist':
        return 'Quality Checklist';
      default:
        return 'Dashboard';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'videos':
        return 'Access training materials and tutorial videos';
      case 'checklist':
        return 'Complete quality control steps and procedures';
      default:
        return 'Your artisan workspace';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle()}</h1>
            <p className="text-sm text-gray-500">{getSectionDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search..." 
              className="w-64 pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">John Artisan</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
