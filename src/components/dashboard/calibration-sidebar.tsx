"use client";

import React from 'react';
import { 
  Settings,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CalibrationRule } from '@/lib/processor';

interface CalibrationSidebarProps {
  rules: CalibrationRule[];
  setRules: (rules: CalibrationRule[]) => void;
  options: {
    removeDuplicates: boolean;
    applyCalibration: boolean;
    systemCleanup: boolean;
  };
  setOptions: (options: any) => void;
}

export function CalibrationSidebar({
  options,
  setOptions,
}: CalibrationSidebarProps) {
  
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2.5 px-1">
          <Settings className="w-4 h-4" /> Processor Engine
        </h3>
        <Card className="p-5 space-y-5 bg-muted/10 border-white/5 shadow-inner">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold tracking-tight uppercase cursor-pointer" htmlFor="cleanup-toggle">System Cleanup</Label>
            <Switch 
              id="cleanup-toggle"
              checked={options.systemCleanup}
              onCheckedChange={(val) => setOptions({ ...options, systemCleanup: val })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold tracking-tight uppercase cursor-pointer" htmlFor="duplicate-toggle">Remove Duplicates</Label>
            <Switch 
              id="duplicate-toggle"
              checked={options.removeDuplicates}
              onCheckedChange={(val) => setOptions({ ...options, removeDuplicates: val })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold tracking-tight uppercase cursor-pointer" htmlFor="calibration-toggle">Apply Calibration</Label>
            <Switch 
              id="calibration-toggle"
              checked={options.applyCalibration}
              onCheckedChange={(val) => setOptions({ ...options, applyCalibration: val })}
            />
          </div>
        </Card>
      </div>

      <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
        <p className="text-[11px] font-bold text-muted-foreground leading-relaxed uppercase">
          Configure how the engine handles raw data rows during the multi-pass validation sequence.
        </p>
      </div>
    </div>
  );
}
