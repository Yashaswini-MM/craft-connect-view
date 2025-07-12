
import React from 'react';
import { Play, CheckSquare, User, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { ActiveSection } from '@/pages/ArtisanDashboard';

interface ArtisanSidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const navigationItems = [
  {
    title: 'Videos',
    icon: Play,
    key: 'videos' as ActiveSection,
    description: 'Training & Tutorial Videos'
  },
  {
    title: 'Checklist',
    icon: CheckSquare,
    key: 'checklist' as ActiveSection,
    description: 'Quality Control Steps'
  }
];

export function ArtisanSidebar({ activeSection, onSectionChange }: ArtisanSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent>
        {/* Brand Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-gray-900">Artisan Portal</h2>
                <p className="text-xs text-gray-500">Welcome back!</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200 ${
                      activeSection === item.key
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon 
                      className={`w-5 h-5 ${
                        activeSection === item.key ? 'text-blue-600' : 'text-gray-500'
                      }`} 
                    />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings at bottom */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <SidebarMenuButton className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600">
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Settings</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
