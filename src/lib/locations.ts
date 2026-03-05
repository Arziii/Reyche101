import locationData from './locations.json';

export interface SectionConfig {
  section: string;
  location: string;
  unitValue?: number;
}

export interface BarangayConfig {
  name: string;
  barangayCode: string;
  sections: SectionConfig[];
}

export const defaultLocationSettings: BarangayConfig[] = locationData.barangays;
