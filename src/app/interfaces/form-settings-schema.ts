import { inject } from '@angular/core';
export interface FormSettingsSchema {
    deadline?: string | Date;
    isPrivate?: boolean;
    maxResponses?: number;
    closeMessage?: string;
    isQuiz?: boolean;
    showScore?: boolean;
    positiveMarks?: number;
    negativeMarks?: number;
}
