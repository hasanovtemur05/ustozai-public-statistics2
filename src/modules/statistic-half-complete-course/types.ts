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
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  lessons: ICourseLesson[];
}

export interface IUserHalfCompleteCourse {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: Address;
  courses: HalfCompleteCourse[];
}

// interface Address {
//   region: string;
//   district: string;
//   neighborhood: string;
// }

// export interface IQuizOption {
//   id: string;
//   isCorrect: boolean;
//   isSelected: boolean;
//   link?: string;
//   value: string;
// }

// export interface IQuiz {
//   id: string;
//   isCompleted: boolean;
//   isCorrect: boolean;
//   options: IQuizOption[];
//   question: string;
//   selectedOptionId: string;
// }

// export interface ICourseLesson {
//   id: string;
//   title: string;
//   orderId: number;
//   link: string;
//   isCompleted: boolean;
//   quizzes: IQuiz[];
//   totalQuizzes: 5;
// }

// export interface HalfCompleteCourse {
//   id: string;
//   title: string;
//   totalLessons: number;
//   completedLessons: number;
//   completionPercentage: number;
//   lessons: ICourseLesson[];
// }

// export interface IUserHalfCompleteCourse {
//   id: string;
//   firstname: string;
//   lastname: string;
//   phone: string;
//   email: string;
//   address: Address;
//   courses: HalfCompleteCourse[];
// }
