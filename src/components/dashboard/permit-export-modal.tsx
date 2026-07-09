"use client";

import React, { useMemo, useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileDown, 
  Calendar,
  Link2,
  Unlink2,
  HelpCircle,
  HardHat,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { parse, isValid, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

export type PermitMatchStatus = 'Matched' | 'Potential Match' | 'Under Review' | 'Unlinked';

export interface PermitExportSettings {
  startDate: string;
  endDate: string;
  statuses: PermitMatchStatus[];
}

interface PermitExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any[];
  onExport: (settings: PermitExportSettings) => void;
}

export function PermitExportModal({
  open,
  onOpenChange,
  data,
  onExport
}: PermitExportModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<PermitMatchStatus[]>([]);

  // Reset filter when opening
  useEffect(() => {
    if (open) {
      setSelectedStatuses([]);
    }
  }, [open]);

  const parseRecordDate = (dateStr: string) => {
    if (!dateStr) return null;
    const cleaned = dateStr.trim();
    const formats = ['MM/dd/yyyy', 'M/d/yyyy', 'yyyy-MM-dd', 'MM-dd-yyyy', 'yyyy-dd-MM'];
    for (const fmt of formats) {
      const parsed = parse(cleaned, fmt, new Date());
      if (isValid(parsed)) return parsed;
    }
    const fallback = new Date(cleaned);
    return isValid(fallback) ? fallback : null;
  };

  const filteredCount = useMemo(() => {
    const start = startDate ? startOfDay(new Date(startDate)) : null;
    const end = endDate ? endOfDay(new Date(endDate)) : null;

    return data.filter(record => {
      let recordStatus: PermitMatchStatus = 'Unlinked';
      if (record.isUnderReview) recordStatus = 'Under Review';
      else if (record.isPotentialMatch) recordStatus = 'Potential Match';
      else if (record.isJoined) recordStatus = 'Matched';

      if (!selectedStatuses.includes(recordStatus)) return false;
      
      if (start || end) {
        const recDate = parseRecordDate(record.dateIssued);
        if (!recDate) return false;
        if (start && recDate < start) return false;
        if (end && recDate > end) return false;
      }
      
      return true;
    }).length;
  }, [data, startDate, endDate, selectedStatuses]);

  const handleExportClick = () => {
    onExport({
      startDate,
      endDate,
      statuses: selectedStatuses
    });
    onOpenChange(false);
  };

  const toggleStatus = (status: PermitMatchStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] overflow-hidden flex flex-col bg-card/95 backdrop-blur-3xl border-white/10 p-0 shadow-2xl">
        <div className="p-8 shrink-0 bg-orange-600/5 border-b">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-orange-600/20 p-3 rounded-xl border border-orange-600/20">
                <HardHat className="text-orange-600 w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                    Permit Export Controller
                  </DialogTitle>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-muted-foreground hover:text-orange-600 transition-colors outline-none">
                        <HelpCircle className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl p-6">
                      <div className="space-y-3">
                        <h4 className="font-black uppercase text-[10px] tracking-widest text-orange-600">Audit Logic Overview</h4>
                        <p className="text-xs font-bold leading-relaxed text-muted-foreground uppercase">
                          The Permit Export links <span className="text-foreground">Building Permit logs</span> with the <span className="text-foreground">Assessment Roll</span>.
                          <br /><br />
                          Specify which <span className="text-orange-600">Match Statuses</span> to include in your report. All statuses are unchecked by default for higher precision.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <DialogDescription className="text-base font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                  Generate a filtered Abstract of Building Permits for official reporting.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-vertical-custom p-8 space-y-10">
          <section className="space-y-4">
            <h3 className="text-sm font-black uppercase text-orange-600 tracking-[0.15em] flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Issuance Period
            </h3>
            <Card className="p-5 bg-muted/10 border-white/5 shadow-inner rounded-2xl grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">From Date Issued</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-11 font-bold text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">To Date Issued</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-11 font-bold text-sm" />
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-orange-600 tracking-[0.15em] flex items-center gap-2">
                <Link2 className="w-4 h-4" /> Match Status Filter
              </h3>
              <div className="flex gap-4">
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setSelectedStatuses(['Matched', 'Potential Match', 'Under Review', 'Unlinked'])} 
                  className="text-[10px] font-black uppercase text-muted-foreground h-auto p-0 hover:text-orange-600"
                >
                  Select All
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setSelectedStatuses([])} 
                  className="text-[10px] font-black uppercase text-muted-foreground h-auto p-0 hover:text-orange-600"
                >
                  Clear All
                </Button>
              </div>
            </div>
            <Card className="p-5 bg-muted/10 border-white/5 shadow-inner rounded-2xl grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { id: 'Matched', label: 'Matched', icon: CheckCircle2, color: 'text-emerald-600' },
                { id: 'Potential Match', label: 'Potential Match', icon: AlertCircle, color: 'text-amber-500' },
                { id: 'Under Review', label: 'Under Review', icon: AlertCircle, color: 'text-orange-500' },
                { id: 'Unlinked', label: 'Unlinked', icon: Unlink2, color: 'text-red-500' },
              ].map((status) => (
                <div key={status.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`p-stat-${status.id}`} 
                      checked={selectedStatuses.includes(status.id as any)} 
                      onCheckedChange={() => toggleStatus(status.id as any)} 
                    />
                    <Label htmlFor={`p-stat-${status.id}`} className="text-xs font-bold uppercase cursor-pointer flex items-center gap-2">
                      <status.icon className={cn("w-3.5 h-3.5", status.color)} /> {status.label}
                    </Label>
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black bg-muted/50 border-white/5">
                    {data.filter(r => {
                      let s: PermitMatchStatus = 'Unlinked';
                      if (r.isUnderReview) s = 'Under Review';
                      else if (r.isPotentialMatch) s = 'Potential Match';
                      else if (r.isJoined) s = 'Matched';
                      return s === status.id;
                    }).length}
                  </Badge>
                </div>
              ))}
            </Card>
          </section>
        </div>

        <DialogFooter className="p-8 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Report Payload:</span>
            <Badge className="font-mono text-xl font-black px-6 py-2 bg-background text-foreground shadow-lg border-white/5">
                {filteredCount.toLocaleString()} Rows
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-black uppercase text-xs tracking-widest px-8 h-12 hover:bg-muted">Discard</Button>
            <Button 
              onClick={handleExportClick} 
              disabled={filteredCount === 0 || selectedStatuses.length === 0}
              className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-xs tracking-widest px-12 h-12 shadow-2xl shadow-orange-500/20"
            >
              <FileDown className="w-4 h-4 mr-2" /> Generate Report
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
