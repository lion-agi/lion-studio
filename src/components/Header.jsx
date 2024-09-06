import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Settings, 
  HelpCircle, 
  Download, 
  Upload, 
  PlusCircle 
} from 'lucide-react';

const Header = ({ 
  activeView, 
  onViewChange, 
  onExportJSON, 
  onSaveLoad, 
  onCreateAgenticFlow 
}) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Lion Studio</h1>
          <nav>
            <Button 
              variant={activeView === 'workflow' ? 'secondary' : 'ghost'} 
              onClick={() => onViewChange('workflow')}
            >
              <Home className="mr-2 h-4 w-4" />
              Workflow
            </Button>
            <Button 
              variant={activeView === 'settings' ? 'secondary' : 'ghost'} 
              onClick={() => onViewChange('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant={activeView === 'help' ? 'secondary' : 'ghost'} 
              onClick={() => onViewChange('help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onExportJSON}>
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={onSaveLoad}>
            <Upload className="mr-2 h-4 w-4" />
            Save/Load
          </Button>
          <Button variant="primary" onClick={onCreateAgenticFlow}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Flow
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;