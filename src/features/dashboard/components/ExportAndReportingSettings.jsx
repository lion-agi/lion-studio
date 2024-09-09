import React, { useState } from 'react';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { useSettingsStore } from '@/store/settingsSlice';

const ExportAndReportingSettings = () => {
  const { exportFormat, setExportFormat, reportScheduling, setReportScheduling, customReports, setCustomReports } = useSettingsStore();
  const [customReportName, setCustomReportName] = useState('');

  const handleSaveCustomReport = () => {
    if (customReportName) {
      setCustomReports([...customReports, customReportName]);
      setCustomReportName('');
    }
  };

  const exportToCSV = () => {
    // Implement export to CSV logic here
  };

  const exportToJSON = () => {
    // Implement export to JSON logic here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="exportFormat" className="text-lg">Export Format</Label>
        <Select value={exportFormat} onValueChange={setExportFormat}>
          <SelectTrigger id="exportFormat">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CSV">CSV</SelectItem>
            <SelectItem value="JSON">JSON</SelectItem>
            <SelectItem value="XML">XML</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="reportSchedule" className="text-lg">Report Scheduling</Label>
        <Select value={reportScheduling} onValueChange={setReportScheduling}>
          <SelectTrigger id="reportSchedule">
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="customReportName" className="text-lg">Custom Report Name</Label>
        <Input
          id="customReportName"
          value={customReportName}
          onChange={(e) => setCustomReportName(e.target.value)}
          placeholder="Enter custom report name"
        />
        <Button onClick={handleSaveCustomReport}>Save</Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Saved Custom Reports</h3>
        <ul>
          {customReports.map((report, index) => (
            <li key={index}>{report}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <Button onClick={exportToCSV}>Export to CSV</Button>
        <Button onClick={exportToJSON}>Export to JSON</Button>
      </div>
    </div>
  );
};

export default ExportAndReportingSettings;
