/**
 * Quiz question format.
 *
 * To add a new question, append to the array in the relevant data file:
 *   - easy-zh.ts / easy-en.ts  → easier cultural & daily-life questions
 *   - hard-zh.ts / hard-en.ts  → harder legal & policy questions
 *
 * `correct` is always the right answer, `wrong` is always the wrong answer.
 * The quiz engine randomizes which option appears as A or B at runtime.
 */
export type Question = {
  q: string;
  correct: string;
  wrong: string;
  explanation: string;
};
