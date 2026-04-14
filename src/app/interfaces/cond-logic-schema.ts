export interface CondLogicSchema {
    enabled: boolean;
    sourceFieldId: string;
    operator: 'EQUAL' | 'NOT EQUAL' | 'CONTAINS';
    value: any;
    action: 'SHOW' | 'HIDE';
}
