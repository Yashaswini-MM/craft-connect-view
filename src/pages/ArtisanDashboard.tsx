
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ArtisanSidebar } from '@/components/artisan/ArtisanSidebar';
import { VideoSection } from '@/components/artisan/VideoSection';
import { ChecklistSection } from '@/components/artisan/ChecklistSection';
import { Header } from '@/components/artisan/Header';

export type ActiveSection = 'videos' | 'checklist';

const ArtisanDashboard = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('videos');

  const renderContent = () => {
    switch (activeSection) {
      case 'videos':
        return <VideoSection />;
      case 'checklist':
        return <ChecklistSection />;
      default:
        return <VideoSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <ArtisanSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="flex-1 flex flex-col">
          <Header activeSection={activeSection} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ArtisanDashboard;
