
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  Info, 
  HelpCircle, 
  Database, 
  Settings, 
  Table as TableIcon, 
  FileDown, 
  Zap, 
  Files, 
  ShieldCheck, 
  Search,
  LayoutDashboard,
  Cpu,
  BarChart3
} from 'lucide-react';

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-card/95 backdrop-blur-3xl border-white/10 p-0 shadow-2xl">
        <div className="p-10 pb-6 shrink-0 bg-primary/5 border-b">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 p-3 rounded-2xl shadow-inner border border-primary/20">
                <Info className="text-primary w-7 h-7" />
              </div>
              <DialogTitle className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
                About DataLink Parañaque
              </DialogTitle>
            </div>
            <DialogDescription className="text-lg font-bold text-muted-foreground leading-relaxed">
              DataLink Parañaque is a specialized multi-file processor designed to automate the cleaning, calibration, and standardization of Real Property Land Records. It transforms bulk spreadsheets into structured, audit-ready data for the City of Parañaque.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-vertical-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="space-y-8">
              <h3 className="text-base font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                <Zap className="w-5 h-5" /> Advanced Capabilities
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground font-bold">
                Our engine ensures every record follows city-mandated rules through intelligent wildcard matching, automated financial computations, and persistent audit tracking.
              </p>
              
              <div className="bg-muted/30 rounded-3xl p-8 border border-white/5 space-y-6 shadow-inner">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400">Core Features</h4>
                <ul className="space-y-4">
                  {[
                    "Multi-File Staging: Drop multiple spreadsheets and review them before processing.",
                    "Smart Export Controller: Granular control over columns, barangays, and data types (Approved vs. Archive).",
                    "Rule-Based Diagnostics: Get automated explanations for every chart in the analytics suite.",
                    "Pre-Run Configuration: Review and toggle engine settings (Cleanup, Duplicates, Calibration) before every run.",
                    "Persistent Audit Log: Automatically saves history of every batch run and export on your local device.",
                    "Intelligent PIN Wildcards: Auto-mapping via sophisticated PIN pattern recognition.",
                    "Financial Automation: Unit value and tax level auto-computation based on city standards."
                  ].map((item, i) => {
                    const [title, desc] = item.split(': ');
                    return (
                      <li key={i} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2.5 text-sm font-black text-foreground/90 uppercase tracking-tight">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-md shadow-primary/30" />
                          {title}
                        </div>
                        <div className="text-xs font-bold text-muted-foreground ml-4 leading-snug">
                          {desc}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-base font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                <HelpCircle className="w-5 h-5" /> Interactive Tutorial
              </h3>
              
              <Accordion type="single" collapsible className="w-full space-y-3">
                <AccordionItem value="step-1" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><Files className="w-4 h-4 text-primary" /> 1. Stage & Import Data</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    Drag multiple Excel files into the Import Zone. Review the staged file list, remove any errors, and click <span className="text-primary font-black uppercase">"Process Selected Data"</span> to load the records into the preview workspace.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-2" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><Settings className="w-4 h-4 text-primary" /> 2. Global Calibration</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    Open the <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">Global Calibration Panel</span> (Gear Icon) to define Unit Values and Location Names for specific PIN patterns. The engine uses these rules to auto-map data as it processes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-3" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><Cpu className="w-4 h-4 text-primary" /> 3. Run Batch Processor</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    Click <span className="font-black uppercase">"Run Batch Processor"</span>. A configuration modal will appear allowing you to toggle Cleanup, Duplicate Removal, and Calibration. Confirm your settings to trigger the multi-pass validation sequence.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-4" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><BarChart3 className="w-4 h-4 text-primary" /> 4. Explore Intelligence</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    Visit the <span className="font-black uppercase">Analytics</span> tab to see data trends. Click the <span className="text-primary font-black">"Explain"</span> button on any chart for rule-based diagnostics, or use <span className="font-black uppercase">"Expand"</span> to see detailed distribution tables.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-5" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><FileDown className="w-4 h-4 text-primary" /> 5. Smart Export Controller</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    Click <span className="text-primary font-black uppercase">"Export Data"</span>. Use the controller to select exactly which columns, barangays, and data types (Approved Results or Archive) you need. The resulting filename will automatically reflect your filter selections.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="step-6" className="border-white/10 bg-muted/20 rounded-2xl px-5 border shadow-sm">
                  <AccordionTrigger className="text-sm font-black uppercase hover:no-underline py-5 tracking-tight">
                    <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-primary" /> 6. Permanent Audit Log</div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-bold text-muted-foreground leading-relaxed pb-5">
                    The <span className="font-black uppercase">Audit Log</span> tab stores a persistent history of every processing run and export. These logs are saved locally on your device, providing a permanent ledger for official city record-keeping.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="p-8 border-t bg-muted/20 flex items-center justify-between shrink-0">
          <div className="text-[11px] font-black uppercase text-muted-foreground tracking-widest opacity-60">
            DataLink v3.1.0 | Parañaque City Land Records
          </div>
          <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-emerald-800 font-black uppercase text-xs tracking-widest px-12 h-12 shadow-lg shadow-primary/20">
            Close & Resume Work
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
