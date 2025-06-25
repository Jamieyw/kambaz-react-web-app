export interface BaseQuestion {
  _id?: string;
  quizId: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  points: number;
  question: string; // Rich text content
  order: number;
  isNew?: boolean; // Flag for newly created questions not yet saved
  editMode?: boolean; // Track if question is in edit mode
}

export interface Choice {
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  choices: Choice[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface Blank {
  text: string;
  caseSensitive: boolean;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  blanks: Blank[];
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInBlankQuestion;

// Default question factory
export const createDefaultQuestion = (quizId: string, order: number): MultipleChoiceQuestion => ({
  quizId,
  type: 'multiple-choice',
  points: 1,
  question: 'New Question',
  order,
  choices: [
    { text: 'Choice 1', isCorrect: true },
    { text: 'Choice 2', isCorrect: false },
    { text: 'Choice 3', isCorrect: false }
  ],
  isNew: true,
  editMode: true
});