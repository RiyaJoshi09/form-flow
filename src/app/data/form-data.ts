export interface Form {
  id: number;
  title: string;
  category: string;
  responses: number;
  status: 'active' | 'draft';
  created_at: string;
}

export const FORMS_DATA: Form[] = [
  {
    id: 1,
    title: 'Client Intake Questionnaire',
    category: 'Residential Projects Phase 1',
    responses: 248,
    status: 'active',
    created_at: 'Oct 24, 2023'
  },
  {
    id: 2,
    title: 'Site Analysis Feedback',
    category: 'Urban Planning Collective',
    responses: 1024,
    status: 'active',
    created_at: 'Oct 22, 2023'
  },
  {
    id: 3,
    title: 'Internal Peer Review',
    category: 'Architectural Design Q4',
    responses: 12,
    status: 'draft',
    created_at: 'Oct 18, 2023'
  },
  {
    id: 4,
    title: 'Material Selection Survey',
    category: 'Sustainable Build Initiative',
    responses: 892,
    status: 'active',
    created_at: 'Oct 15, 2023'
  },
  {
    id: 5,
    title: 'Zoning Regulation Quiz',
    category: 'Employee Training Series',
    responses: 54,
    status: 'draft',
    created_at: 'Oct 10, 2023'
  }
];