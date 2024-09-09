import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableCustomizationSettings from './TableCustomizationSettings';
import DisplayPreferencesSettings from './DisplayPreferencesSettings';
import DataVisualizationSettings from './DataVisualizationSettings';
import NotificationSettings from './NotificationSettings';
import PerformanceOptimizationSettings from './PerformanceOptimizationSettings';
import ExportAndReportingSettings from './ExportAndReportingSettings';
import UserPreferencesSettings from './UserPreferencesSettings';
import AccessibilitySettings from './AccessibilitySettings';
import AdvancedFeaturesSettings from './AdvancedFeaturesSettings';
import SecuritySettings from './SecuritySettings';
import { SettingsProvider } from './SettingsContext';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

const settingsCategories = [
  { name: 'Table Customization', component: TableCustomizationSettings },
  { name: 'Display Preferences', component: DisplayPreferencesSettings },
  { name: 'Data Visualization', component: DataVisualizationSettings },
  { name: 'Notification Settings', component: NotificationSettings },
  { name: 'Performance Optimization', component: PerformanceOptimizationSettings },
  { name: 'Export and Reporting', component: ExportAndReportingSettings },
  { name: 'User Preferences', component: UserPreferencesSettings },
  { name: 'Accessibility', component: AccessibilitySettings },
  { name: 'Advanced Features', component: AdvancedFeaturesSettings },
  { name: 'Security', component: SecuritySettings },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState(settingsCategories[0].name);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = settingsCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SettingsProvider>
      <div className="flex h-screen">
        <aside className="w-1/4 bg-gray-800 text-white p-4">
          <Input
            type="text"
            placeholder="Search settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <nav>
            <ul>
              {filteredCategories.map(category => (
                <li key={category.name}>
                  <Button
                    variant="ghost"
                    className={`w-full text-left ${activeCategory === category.name ? 'bg-gray-700' : ''}`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-3/4 p-4">
          {settingsCategories.map(category => (
            category.name === activeCategory && (
              <div key={category.name}>
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                <category.component />
              </div>
            )
          ))}
          <div className="flex justify-end mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Apply Changes</Button>
            <Button variant="outline" className="ml-2">Reset to Default</Button>
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default SettingsPage;
