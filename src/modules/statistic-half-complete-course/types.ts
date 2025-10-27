
interface Address {
  region: string;
  district: string;
  neighborhood: string;
}

export interface ICourseLesson {
  id: string;
  title: string;
  orderId: number;
  link: string;
  isCompleted: boolean;
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
