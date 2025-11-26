import { X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { useUserActivity } from 'modules/statistic-half-complete-course/hooks/useGetUserActivity';
import Loader from 'components/Loader';
import { format } from 'date-fns';

interface IProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

const UserActivity = ({ userId, userName, onClose }: IProps) => {
  const { data: activityData, isLoading } = useUserActivity(userId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-auto">
          <Loader />
        </div>
      </div>
    );
  }

  if (!activityData) {
    return null;
  }

  const { battle, portfolio, fortuna } = activityData;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {userName} - Faollik Ma'lumotlari
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Battle Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              🎮 Battle (Jang o'yinlari)
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-600">Jami o'yinlar</p>
                <p className="text-2xl font-bold">{battle.totalGames}</p>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-sm text-gray-600">G'alabalar</p>
                <p className="text-2xl font-bold text-green-600">{battle.wins}</p>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <p className="text-sm text-gray-600">Mag'lubiyatlar</p>
                <p className="text-2xl font-bold text-red-600">{battle.losses}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <p className="text-sm text-gray-600">Duranglar</p>
                <p className="text-2xl font-bold text-yellow-600">{battle.draws}</p>
              </div>
            </div>

            {battle.games.length > 0 ? (
              <div className="space-y-2">
                <h4 className="font-semibold">O'yinlar tarixi:</h4>
                <div className="max-h-60 overflow-y-auto">
                  {battle.games.map((game) => (
                    <div key={game.gameId} className="border-l-4 border-blue-400 pl-4 py-2 mb-2 bg-gray-50">
                      <p className="font-medium">{game.courseTitle}</p>
                      <div className="text-sm text-gray-600 flex gap-4 flex-wrap">
                        <span>
                          {game.isLeft ? '❌ Tark etgan' : game.isWinner === null ? '⏳ Kutilmoqda' : game.isWinner ? '✅ Yutdi' : game.isDraw ? '🤝 Durrang' : '❌ Yutqazdi'}
                        </span>
                        {game.correctCount !== null && (
                          <span>To'g'ri javoblar: {game.correctCount}</span>
                        )}
                        {game.opponent && (
                          <span>Raqib: {game.opponent.firstname} {game.opponent.lastname}</span>
                        )}
                        <span>{format(new Date(game.createdAt), 'dd.MM.yyyy HH:mm')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Hozircha o'yinlar yo'q</p>
            )}
          </div>

          {/* Portfolio Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              📁 Portfolio
            </h3>
            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="text-sm text-gray-600">Jami portfoliolar</p>
              <p className="text-2xl font-bold">{portfolio.totalPortfolios}</p>
            </div>

            {portfolio.portfolios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.portfolios.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">Kurs: {item.courseTitle}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(item.createdAt), 'dd.MM.yyyy HH:mm')}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                      item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      item.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Hozircha portfoliolar yo'q</p>
            )}
          </div>

          {/* Fortuna Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-green-600">
              🎰 Fortuna (G'ildirak)
            </h3>
            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="text-sm text-gray-600">Jami aylantirishlar</p>
              <p className="text-2xl font-bold">{fortuna.totalSpins}</p>
            </div>

            {fortuna.history.length > 0 ? (
              <div className="space-y-2">
                <h4 className="font-semibold">Tarix:</h4>
                <div className="max-h-60 overflow-y-auto">
                  {fortuna.history.map((item) => (
                    <div key={item.id} className="border-l-4 border-green-400 pl-4 py-2 mb-2 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(item.createdAt), 'dd.MM.yyyy HH:mm')}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.status === 'DONE' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status === 'DONE' ? 'Bajarildi' : 'Kutilmoqda'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Hozircha tarix yo'q</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
