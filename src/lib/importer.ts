
import * as XLSX from 'xlsx';
import { LandRecord } from './processor';

export const HEADER_ALIASES = {
  pin: [
    'pin', 'pin #', 'pin no', 'pin no.', 'property index no', 
    'property index number', 'property identification number', 
    'td pin', 'p.i.n.', 'property index', 'id pin'
  ],
  arpNo: [
    'arp no#', 'arp no', 'arp', 'arp number', 'current arp', 
    'current', 'td no', 'td number', 'td no.', 'arp. no.', 
    'tax declaration', 'tax declaration no', 'current td'
  ],
  acctName: [
    'acctname', 'account name', 'owner', 'owner name', 
    'owners name', 'acct name', 'account', 'taxpayer name', 
    'taxpayer', 'tax payer', 'declared owner'
  ],
  address: [
    'address', 'location', 'property address', 'location of property', 
    'addr', 'situs', 'site address'
  ],
  landArea: [
    'land area', 'area', 'area (sqm)', 'sqm', 'sq.m.', 'sq.m', 
    'lot area', 'total area', 'sq m', 'sq meters', 'total sqm'
  ],
  unitValue: [
    'unit value', 'uv', 'unit cost', 'market value per sqm', 
    'unit price', 'market unit value'
  ],
  marketValue: [
    'market value', 'mv', 'total market value', 'market val', 
    'total mv', 'market value total'
  ],
  assessedValue: [
    'assessed value', 'av', 'al', 'assessed val', 'total av', 
    'assessed level amount', 'total assessed'
  ],
  yearlyTax: [
    'yearly tax', 'tax', 'annual tax', 'tax due', 'yearly tax due', 
    'annual tax due', 'total tax'
  ],
  update: [
    'update', 'upd', 'update code', 'type', 'upd code', 'u', 
    'revision', 'transaction code'
  ],
  kind: ['kind', 'k', 'property kind', 'classification'],
  au: [
    'au', 'actual use', 'use', 'a.u.', 'actual usage', 
    'usage code'
  ],
  date: [
    'date', 'effectivity', 'date effectivity', 'eff date', 
    'revision date', 'date of effectivity'
  ]
};

export const mapRawToRecords = (raw: any[], fileName: string): LandRecord[] => {
  return raw.map((item, index) => {
    const norm: any = {};
    Object.keys(item).forEach(key => {
      const cleanKey = key.trim().toLowerCase();
      norm[cleanKey] = String(item[key]).trim();
    });

    const getValue = (field: keyof typeof HEADER_ALIASES) => {
      const aliases = HEADER_ALIASES[field];
      for (const alias of aliases) {
        if (norm[alias] !== undefined && norm[alias] !== "") return norm[alias];
      }
      return "";
    };

    const parseNum = (val: any) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const clean = val.replace(/[^0-9.-]/g, '');
        const parsed = parseFloat(clean);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    let kind = String(getValue('kind')).trim();
    let au = String(getValue('au')).trim();
    
    const kau = String(norm['k-au'] || norm['k/au'] || '').trim();
    if (kau && kau.includes('-')) {
      const parts = kau.split('-');
      kind = parts[0]?.trim() || kind;
      au = parts[1]?.trim() || au;
    }
    
    const pin = String(getValue('pin')).trim();
    const arpNo = String(getValue('arpNo')).trim();

    const uniqueId = `${fileName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      id: uniqueId,
      date: String(getValue('date')).trim(),
      arpNo: arpNo,
      pin: pin,
      update: String(getValue('update')).trim(),
      taxability: 'T',
      acctName: String(getValue('acctName')).trim(),
      address: String(getValue('address')).trim(),
      location: String(norm['location'] || '').trim(),
      kind: kind,
      au: au,
      landArea: parseNum(getValue('landArea')),
      unitValue: parseNum(getValue('unitValue')),
      marketValue: parseNum(getValue('marketValue')),
      assessedValue: parseNum(getValue('assessedValue')),
      yearlyTax: parseNum(getValue('yearlyTax')),
      isCleanup: false,
      cleanupReason: "",
      sourceFile: fileName,
      rawRow: item
    };
  });
};

export const parseFile = async (file: File): Promise<{ data: LandRecord[], count: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: false,
          cellNF: true,
          cellText: true
        });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: "" }) as any[];
        const rawCount = json.length;
        const mappedData = mapRawToRecords(json, file.name);
        resolve({ data: mappedData, count: rawCount });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("File read error"));
    reader.readAsArrayBuffer(file);
  });
};
