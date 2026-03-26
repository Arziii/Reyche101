'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, FileSearch, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  onDownload?: () => void;
  onViewResult?: () => void;
}

export function SuccessModal({
  open,
  onOpenChange,
  title = "Processing Completed",
  message = "The batch processor has finished analyzing your data. Please conduct a manual review of all records to ensure 100% accuracy before final export.",
  onDownload,
  onViewResult,
}: SuccessModalProps) {
  const timestamp = format(new Date(), 'p');

  const handleDownload = () => {
    onOpenChange(false);
    onDownload?.();
  };

  const handleViewResult = () => {
    onOpenChange(false);
    onViewResult?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl p-10" hideClose>
        <div className="text-center space-y-8">
          <div className="w-24 h-24 bg-emerald-100/50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200/50 dark:border-emerald-800/50 shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="space-y-3">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-black text-foreground uppercase tracking-tight">{title}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground font-bold leading-relaxed max-w-md mx-auto">
                {message}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-left">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest">Manual Verification Required</p>
              <p className="text-[11px] font-bold text-amber-600/80 leading-relaxed">
                The automated engine has calibrated the records based on official indices, but specific lot variations or missing PIN data may still require your manual oversight.
              </p>
            </div>
          </div>

          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            Sequence Completed at {timestamp}
          </div>

          <DialogFooter className="flex-col sm:flex-row-reverse sm:justify-center gap-4 pt-4">
            <Button className="font-black uppercase text-xs tracking-widest h-14 px-10 bg-primary hover:bg-emerald-800 shadow-xl shadow-primary/20 flex-1 sm:flex-none" onClick={handleViewResult}>
              <FileSearch className="w-4.5 h-4.5 mr-2" />
              Review & View Result
            </Button>
            <Button variant="outline" className="font-black uppercase text-xs tracking-widest h-14 px-10 border-muted-foreground/20 flex-1 sm:flex-none" onClick={handleDownload}>
              <Download className="w-4.5 h-4.5 mr-2" />
              Direct Export
            </Button>
          </DialogFooter>
        </div>
         <button onClick={() => onOpenChange(false)} className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground hover:bg-muted transition-all">
           <X className="h-5 w-5" />
           <span className="sr-only">Close</span>
         </button>
      </DialogContent>
    </Dialog>
  );
}
