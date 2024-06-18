export interface Field {
    id: string;
    label: string;
    type: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox';
    required?: boolean;
    placeholder?: string;
    help?: string;
    options?: FieldOption[];
}

interface FieldOption {
    value: string;
    label: string;
}

type Row = Field[];

export type Rows = Row[];