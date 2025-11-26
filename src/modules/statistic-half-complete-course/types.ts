import { CertificateDegreeType } from 'modules/user-certificate/types';

interface Address {
  region: string;
  district: string;
  neighborhood: string;
}

export interface IQuizOption {
  id: string;
  isCorrect: boolean;
  isSelected: boolean;
  link?: string;
  value: string;
}

export interface IQuiz {
  id: string;
  isCompleted: boolean;
  isCorrect: boolean;
  options: IQuizOption[];
  question: string;
  selectedOptionId: string;
}

export interface ICourseLesson {
  id: string;
  title: string;
  orderId: number;
  link: string;
  isCompleted: boolean;
  quizzes: IQuiz[];
  totalQuizzes: number;
  completedQuizzes: number;
  correctAnswers: number;
}

export interface HalfCompleteCourse {
  courseId: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  lessons: ICourseLesson[];
  exam: {
    totalQuestions: number;
    correctAnswers: number;
    examPercentage: number;
    examDegree: CertificateDegreeType;
    questions: IQuiz[];
  };
}
export interface HalfCompleteCourseV2 {
  courseId: string;
  courseTitle: string;
  percentage: number;
}

export interface UserActivity {
  fortuna: number;
  portfolio: number;
  battle: number;
}

export interface IUserHalfCompleteCourse {
  userId: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: Address;
  courses: HalfCompleteCourseV2[];
  activity: UserActivity;
}

export type UserTypeFilter = 'ALL' | 'COURSE' | 'ACTIVITY';

// User Activity Types
export interface IBattleOpponent {
  userId: string;
  firstname: string;
  lastname: string;
  photo: string | null;
}

export interface IBattleGame {
  gameId: string;
  courseId: string;
  courseTitle: string;
  isWinner: boolean | null;
  isDraw: boolean | null;
  isLeft: boolean;
  correctCount: number | null;
  createdAt: string;
  opponent: IBattleOpponent | null;
}

export interface IBattleActivity {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  games: IBattleGame[];
}

export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  photo: string;
  courseId: string;
  courseTitle: string;
  createdAt: string;
  status: string;
}

export interface IPortfolioActivity {
  totalPortfolios: number;
  portfolios: IPortfolioItem[];
}

export interface IFortunaHistory {
  id: string;
  title: string;
  photo: string;
  status: 'DONE' | 'PENDING';
  createdAt: string;
}

export interface IFortunaActivity {
  totalSpins: number;
  history: IFortunaHistory[];
}

export interface IUserActivityDetail {
  battle: IBattleActivity;
  portfolio: IPortfolioActivity;
  fortuna: IFortunaActivity;
}

// Detailed user course information structure
export interface IExamQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    link?: string;
    value: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
  isUserCorrect: boolean;
}

export interface IExamSection {
  totalQuestions: number;
  correctAnswers: number;
  degree: CertificateDegreeType;
  questions: IExamQuestion[];
}

export interface ILessonQuiz {
  id: string;
  question: string;
  options: {
    id: string;
    link?: string;
    value: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
  isUserCorrect: boolean;
}

export interface IDetailedLesson {
  id: string;
  title: string;
  orderId: number;
  link: string;
  isCompleted: boolean;
  quizzes: ILessonQuiz[];
}

export interface IUserCourseDetail {
  userId: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  lessons: IDetailedLesson[];
  exam: IExamSection;
}
