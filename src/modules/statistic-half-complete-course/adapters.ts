import { get } from 'lodash';
import { IUserHalfCompleteCourse } from './types';

export const getData = (item?: IUserHalfCompleteCourse) => {
  return {
    userId: item?.userId ?? '',
    firstname: item?.firstname ?? '',
    lastname: item?.lastname ?? '',
    phone: item?.phone ?? '',
    email: item?.email ?? '',
    address: item?.address ? item.address : null,
    courses: item?.courses?.length
      ? item.courses.map((c) => ({
          courseId: c.courseId,
          courseTitle: c.courseTitle,
          percentage: c.percentage,
        }))
      : [],
  };
};

export const getDatasList = (data?: IUserHalfCompleteCourse[]) => {
  return data?.length ? data.map((item) => getData(item)) : [];
};

// for course data
export const getUserCourseData = (courseData?: any) => {
  return {
    userId: courseData?.userId ?? '',
    firstname: courseData?.firstname ?? '',
    lastname: courseData?.lastname ?? '',
    phone: courseData?.phone ?? '',
    email: courseData?.email ?? '',
    courseId: courseData?.courseId ?? '',
    courseTitle: courseData?.courseTitle ?? '',
    totalLessons: courseData?.totalLessons ?? 0,
    completedLessons: courseData?.completedLessons ?? 0,
    completionPercentage: courseData?.completionPercentage ?? 0,
    lessons:
      courseData?.lessons?.map((lesson: any) => ({
        id: lesson.id ?? '',
        title: lesson.title ?? '',
        orderId: lesson.orderId ?? 0,
        link: lesson.link ?? '',
        isCompleted: lesson.isCompleted ?? false,
        quizzes:
          lesson.quizzes?.map((quiz: any) => ({
            id: quiz.id ?? '',
            question: quiz.question ?? '',
            options:
              quiz.options?.map((option: any) => ({
                id: option.id ?? '',
                link: option.link ?? '',
                value: option.value ?? '',
                isCorrect: option.isCorrect ?? false,
                isSelected: option.isSelected ?? false,
              })) ?? [],
            isUserCorrect: quiz.isUserCorrect ?? false,
          })) ?? [],
      })) ?? [],
    exam: courseData?.exam
      ? {
          totalQuestions: courseData?.exam?.totalQuestions ?? 0,
          correctAnswers: courseData?.exam?.correctAnswers ?? 0,
          degree: courseData?.exam?.degree ?? '',
          questions:
            courseData?.exam?.questions?.map((question: any) => ({
              id: question.id ?? '',
              question: question.question ?? '',
              options:
                question.options?.map((option: any) => ({
                  id: option.id ?? '',
                  link: option.link ?? '',
                  value: option.value ?? '',
                  isCorrect: option.isCorrect ?? false,
                  isSelected: option.isSelected ?? false,
                })) ?? [],
              isUserCorrect: question.isUserCorrect ?? false,
            })) ?? [],
        }
      : null,
  };
};
