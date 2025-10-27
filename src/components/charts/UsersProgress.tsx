import { useState } from 'react';
import { IUserHalfCompleteCourse } from 'modules/statistic-half-complete-course/types';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from 'components/ui/button';

interface Lesson {
  id: string;
  title: string;
  orderId: number;
  link: string;
  isCompleted: boolean;
}

interface CourseData {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  lessons: Lesson[];
}

export default function UsersProgress({ user, onClose }: { user: IUserHalfCompleteCourse; onClose: () => void }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(user.courses?.[0]?.id || '');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const courses = (user as any)?.courses || [];
  const selectedCourse = courses.find((c: CourseData) => c.id === selectedCourseId);
  const lessons = selectedCourse?.lessons || [];

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  console.log(user, 'yuuuuuu');

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
          {' '}
          {user?.address ? user.address?.region + ', ' + user.address?.district + ', ' + user.address?.neighborhood : ''}{' '}
        </h2>
      </div>

      {/* Course Selection */}
      <div className="space-y-4">
        <div className="flex gap-2 items-center flex-wrap">
          {user.courses.length > 0 ? (
            user.courses.map((el: CourseData) => (
              <Button
                onClick={() => {
                  setSelectedCourseId(el.id);
                  setExpandedLessonId(null);
                }}
                className={`${selectedCourseId === el.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                key={el.id}
              >
                {el.title}
              </Button>
            ))
          ) : (
            <p className="text-gray-500">Ushbu foydalanuvchida hali kurslar mavjud emas.</p>
          )}
        </div>

        {/* Course Progress */}
        {selectedCourse && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{selectedCourse.title}</h3>
              <span className="text-sm text-gray-600">
                {selectedCourse.completedLessons}/{selectedCourse.totalLessons}
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${selectedCourse.completionPercentage}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{selectedCourse.completionPercentage}% tugallangan</p>
          </div>
        )}

        {/* Lessons Dropdown */}
        {lessons.length > 0 && (
          <div className="space-y-2">
            {lessons.map((lesson: Lesson) => (
              <div key={lesson.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Lesson Header */}
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
                      <p className="text-xs text-gray-500">{lesson.isCompleted ? '✓ Tugallangan' : 'Boshlanmagan'}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedLessonId === lesson.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Lesson Content */}
                {expandedLessonId === lesson.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-3">
                      {/* Video Preview */}
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

                      {/* Lesson Details */}
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
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
