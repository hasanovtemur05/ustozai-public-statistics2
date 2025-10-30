import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { IUserHalfCompleteCourse } from 'modules/statistic-half-complete-course/types';
import { useGetUserCourseInfo } from 'modules/statistic-half-complete-course/hooks/useGetUserCourseInfo';

export default function UsersProgress({ user, onClose }: { user: IUserHalfCompleteCourse; onClose: () => void }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(user.courses?.[0]?.courseId || '');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const { data, isLoading } = useGetUserCourseInfo(user?.userId, selectedCourseId);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const getDegreeColor = (degree: string) => {
    switch (degree) {
      case 'GOLD':
        return 'bg-yellow-100 text-yellow-800';
      case 'SILVER':
        return 'bg-gray-100 text-gray-800';
      case 'BRONZE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-4 fixed top-0 left-0 w-full h-full bg-white p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onClose}>
          Orqaga
        </Button>
        <h2 className="text-xl font-bold">
          {user.firstname + ' ' + user.lastname} | {user.phone || user.email}
        </h2>
        <h2 className="text-xl font-bold">
          {user?.address ? user.address?.region + ', ' + user.address?.district + ', ' + user.address?.neighborhood : ''}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Course Selection Tabs */}
        <div className="flex gap-2 items-center flex-wrap">
          {user.courses.length > 0 ? (
            user.courses.map((course) => (
              <Button
                onClick={() => {
                  setSelectedCourseId(course.courseId);
                  setExpandedLessonId(null);
                }}
                className={`${selectedCourseId === course.courseId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                key={course.courseId}
              >
                {course.courseTitle}
              </Button>
            ))
          ) : (
            <p className="text-gray-500">Ushbu foydalanuvchida hali kurslar mavjud emas.</p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <div className="text-center py-8 text-gray-500">Yuklanmoqda...</div>}

        {/* Course Data - Displayed as received from API */}
        {data && (
          <>
            {/* Course Progress */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{data.courseTitle}</h3>
                <span className="text-sm text-gray-600">
                  {data.completedLessons}/{data.totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${data.completionPercentage}%` }} />
              </div>
              <p className="text-sm text-gray-600 mt-2">{data.completionPercentage}% tugallangan</p>
            </div>

            {/* Exam Section */}
            {data.completionPercentage === 100 && data.exam && (
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  📜 Yakuniy Imtihon Natijasi
                  <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getDegreeColor(data.exam.degree)}`}>
                    {data.exam.degree}
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {data.exam.correctAnswers}/{data.exam.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-600">To'g'ri javoblar</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {data.exam.totalQuestions > 0 ? Math.round((data.exam.correctAnswers / data.exam.totalQuestions) * 100) : 0}%
                    </p>
                    <p className="text-sm text-gray-600">Foiz natija</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {data.exam.degree === 'GOLD' ? '🥇' : data.exam.degree === 'SILVER' ? '🥈' : '🥉'}
                    </p>
                    <p className="text-sm text-gray-600">Daraja</p>
                  </div>
                </div>

                {/* Exam Questions */}
                <div className="space-y-3">
                  {data.exam.questions.map((q: any, idx: number) => (
                    <details key={q.id} className="border border-gray-300 rounded-lg bg-white">
                      <summary className="p-4 cursor-pointer font-medium flex justify-between items-center hover:bg-gray-50">
                        <span>
                          {idx + 1}.{' '}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: q.question.replace(/\n/g, '<br />'),
                            }}
                          />
                        </span>
                        <span
                          className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${
                            q.isUserCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {q.isUserCorrect ? "✓ To'g'ri" : "✗ Noto'g'ri"}
                        </span>
                      </summary>
                      <div className="p-4 pt-0 space-y-2 border-t">
                        {q.options.map((opt: any) => {
                          let bg = '';
                          let border = '';
                          let icon = null;

                          if (opt.isSelected) {
                            bg = q.isUserCorrect ? 'bg-green-100' : 'bg-red-100';
                            border = q.isUserCorrect ? 'border-green-500' : 'border-red-500';
                            icon = q.isUserCorrect ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />;
                          } else if (opt.isCorrect && !q.isUserCorrect) {
                            bg = 'bg-green-50';
                            border = 'border-green-400';
                            icon = <Check className="w-4 h-4 text-green-600" />;
                          } else {
                            border = 'border-gray-300';
                          }

                          return (
                            <div key={opt.id} className={`p-3 rounded-lg border ${border} ${bg} flex items-center justify-between`}>
                              <span
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html: opt.value.replace(/\n/g, '<br />'),
                                }}
                              />
                              {icon}
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Section */}
            {data.lessons && data.lessons.length > 0 && (
              <div className="space-y-2">
                {data.lessons.map((lesson: any) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">
                            Lesson {lesson.orderId}: {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lesson.isCompleted ? '✓ Tugallangan' : 'Boshlanmagan'} | Quizzes: {lesson.quizzes?.length || 0}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedLessonId === lesson.id ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {expandedLessonId === lesson.id && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="space-y-3">
                          {getYouTubeEmbedUrl(lesson.link) && (
                            <div className="w-full bg-black rounded-lg overflow-hidden">
                              <iframe
                                width="100%"
                                height="300"
                                src={getYouTubeEmbedUrl(lesson.link)}
                                title={lesson.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full border-0"
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">{lesson.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Lesson {lesson.orderId}</span>
                              {lesson.isCompleted && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Tugallangan
                                </span>
                              )}
                            </div>
                          </div>

                          {lesson.quizzes && lesson.quizzes.length > 0 && (
                            <div className="mt-6">
                              <h4 className="font-semibold text-sm mb-4">Quizzes</h4>
                              <div className="space-y-6">
                                {lesson.quizzes.map((quiz: any) => (
                                  <div key={quiz.id} className="border border-gray-300 p-4 rounded-lg bg-white">
                                    <div
                                      className="font-medium mb-1 prose prose-sm max-w-none"
                                      dangerouslySetInnerHTML={{
                                        __html: quiz.question.replace(/\n/g, '<br />'),
                                      }}
                                    />
                                    <ul className="space-y-2">
                                      {quiz.options.map((option: any) => {
                                        let bgClass = '';
                                        let borderClass = '';
                                        let icon = null;

                                        if (option.isSelected) {
                                          bgClass = quiz.isUserCorrect ? 'bg-green-100' : 'bg-red-100';
                                          borderClass = quiz.isUserCorrect ? 'border-green-500' : 'border-red-500';
                                          icon = quiz.isUserCorrect ? (
                                            <Check className="w-4 h-4 text-green-600" />
                                          ) : (
                                            <X className="w-4 h-4 text-red-600" />
                                          );
                                        } else if (option.isCorrect && !quiz.isUserCorrect) {
                                          bgClass = 'bg-green-50';
                                          borderClass = 'border-green-400';
                                          icon = <Check className="w-4 h-4 text-green-600" />;
                                        } else {
                                          borderClass = 'border-gray-300';
                                        }

                                        return (
                                          <li
                                            key={option.id}
                                            className={`p-3 rounded-lg border ${borderClass} ${bgClass} flex items-center justify-between transition-all`}
                                          >
                                            <span
                                              className="flex-1 prose prose-sm max-w-none"
                                              dangerouslySetInnerHTML={{
                                                __html: option.value.replace(/\n/g, '<br />'),
                                              }}
                                            />
                                            {icon}
                                          </li>
                                        );
                                      })}
                                    </ul>

                                    <p className="mt-3 text-sm font-medium text-gray-700">
                                      Status:{' '}
                                      <span
                                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                                          quiz.isUserCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                      >
                                        {quiz.isUserCorrect ? "To'g'ri" : "Noto'g'ri"}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
