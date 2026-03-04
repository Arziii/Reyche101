"use client";

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { LandRecord } from '@/lib/processor';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DataPreviewTableProps {
  data: LandRecord[];
  isProcessed?: boolean;
}

export function DataPreviewTable({ data, isProcessed = false }: DataPreviewTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p>No records to display.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-auto border rounded-md h-[calc(100vh-280px)] scrollbar-thin">
      <Table className="text-[11px]">
        <TableHeader className="bg-muted/50 sticky top-0 z-10">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead className="min-w-[80px]">DATE</TableHead>
            <TableHead className="min-w-[100px]">ARP NO#</TableHead>
            <TableHead className="min-w-[160px]">PIN</TableHead>
            <TableHead className="min-w-[140px]">ACCOUNT NAME</TableHead>
            <TableHead className="min-w-[200px]">LOCATION</TableHead>
            <TableHead className="text-right w-[80px]">AREA</TableHead>
            <TableHead className="text-right w-[110px]">MARKET VAL</TableHead>
            <TableHead className="text-right w-[110px]">ASSESSED VAL</TableHead>
            {!isProcessed && <TableHead className="w-20 text-center">STATUS</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 1000).map((row, i) => (
            <TableRow 
              key={i} 
              className={cn(
                "hover:bg-accent/30",
                !isProcessed && row.isDuplicate && "bg-red-50/50 opacity-60"
              )}
            >
              <TableCell className="text-center font-mono text-muted-foreground p-2">{i + 1}</TableCell>
              <TableCell className="whitespace-nowrap p-2">{row.date || '---'}</TableCell>
              <TableCell className="font-mono text-primary font-semibold p-2">{row.arpNo || '---'}</TableCell>
              <TableCell className="font-mono p-2">{row.pin || '---'}</TableCell>
              <TableCell className="max-w-[140px] truncate uppercase font-medium p-2">{row.acctName || '---'}</TableCell>
              <TableCell className="max-w-[200px] truncate uppercase text-muted-foreground p-2">
                {row.location || '---'}
              </TableCell>
              <TableCell className="text-right font-mono p-2">{row.landArea?.toLocaleString() || '0'}</TableCell>
              <TableCell className="text-right font-mono font-bold p-2 text-blue-700">{row.marketValue?.toLocaleString() || '0'}</TableCell>
              <TableCell className="text-right font-mono font-bold p-2 text-green-700">{row.assessedValue?.toLocaleString() || '0'}</TableCell>
              {!isProcessed && (
                <TableCell className="text-center p-2">
                  {row.isDuplicate ? (
                    <Badge variant="destructive" className="text-[9px] h-4 uppercase">Removed</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[9px] h-4 uppercase bg-green-100 text-green-700 hover:bg-green-100">Kept</Badge>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
          {data.length > 1000 && (
            <TableRow>
              <TableCell colSpan={isProcessed ? 9 : 10} className="text-center py-4 bg-muted/20 text-muted-foreground">
                Showing first 1,000 records of {data.length.toLocaleString()}...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
