import { z } from "zod";

export const addCourseValidate = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  // email: z.string().email({ message: "Email format is not correct" }),
  description: z.string().nonempty({ message: "Description is required" }),
  coverImage: z.string().nonempty({ message: "Cover Picture is required" }),
  language: z.string().nonempty({ message: "Language is required" }),
  skillLevel: z.string().nonempty({ message: "Skill level is required" }),
  price: z.number({ message: "Price is required" }).positive(),
  category: z.string().nonempty({ message: "Category is required" }),
  // displayCount: z
  //   .string()
  //   .nonempty({ message: "Display Count Code is required" }),
});

export const addLessonValidate = z.object({
  lessonId: z.string().optional(),
  lessonType: z.string().nonempty({ message: "Type is required" }),
  lessonTitle: z.string().nonempty({ message: "Title is required" }),
  lessonContent: z.string().nonempty({ message: "Content is required" }),
  lessonUploadFile: z.string().array().optional(),
});

export const addTypeAnswerQuestionValidate = z.object({
  typeQId: z.string().optional(),
  typeQuestion: z.string().nonempty({ message: "Question is required" }),
  typeAnswer: z.string().nonempty({ message: "Answer is required" }),
  quizId: z.string().optional(),
});

export const addBooleanQuestionValidate = z.object({
  booleanId: z.string().optional(),
  booleanQuestion: z.string().nonempty({ message: "Question is required" }),
  booleanAnswer: z.string().nonempty({ message: "Answer is required" }),
  quizId: z.string().optional(),
});

export const addSingleQuestionValidate = z.object({
  scqId: z.string().optional(),
  singleQuestion: z.string().nonempty({ message: "Question is required" }),
  singleAnswer: z.number().array().nonempty({ message: "Answer is required" }),
  quizId: z.string().optional(),
});

export const addMultipleQuestionValidate = z.object({
  mcqId: z.string().optional(),
  multipleQuestion: z.string().nonempty({ message: "Question is required" }),
  multipleAnswer: z
    .number()
    .array()
    .nonempty({ message: "Answer is required" }),
  quizId: z.string().optional(),
});

export const addQuizValidate = z.object({
  quizId: z.string().optional(),
  quizTitle: z.string().nonempty({ message: "Question is required" }),
});
