export interface Field {
  fieldType: string;
  fieldOrder: number;
  fieldConfig: {
    
  }; 
}

export interface Section {
  sectionTitle: string;
  sectionOrder: number;
  fields: Field[];
}

export interface Form {
  id: number;
  title: string;
  description: string;
  published: boolean;
  createdBy: string;
  sections: Section[];
}
