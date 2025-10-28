import { Award, Phone, MapPin, BookOpen, CheckCircle, TrendingUp, Medal, FileText, ArrowLeft } from 'lucide-react';

import { CertificateDegreeType, IUserCertificate } from 'modules/user-certificate/types';
import { Button } from 'components/ui/button';
import { getMediaUrl } from 'utils/common';
import { useVerifyCertificate } from 'modules/user-certificate/hooks/useVerifyCetificate';

export default function VerifyCertificate({ user, onClose }: { user: IUserCertificate; onClose: () => void }) {
  const { data, isLoading } = useVerifyCertificate(user?.uniqueId ? user?.uniqueId + '' : '');

  console.log(data, 'dta');

  const getDegreeColor = (degree: CertificateDegreeType) => {
    switch (degree) {
      case 'GOLD':
        return 'from-yellow-400 to-yellow-600';
      case 'SILVER':
        return 'from-gray-300 to-gray-500';
      case 'BRONZE':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getDegreeIcon = (degree: CertificateDegreeType) => {
    const colors = {
      GOLD: 'text-yellow-500',
      SILVER: 'text-gray-400',
      BRONZE: 'text-orange-500',
    };
    return colors[degree] || 'text-blue-500';
  };

  if (isLoading) {
    return (
      <div className="space-y-4 fixed top-0 left-0 z-50 w-full h-full bg-white p-6 overflow-y-auto">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4 fixed top-0 left-0 z-50 w-full h-full bg-white p-6 overflow-y-auto">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Ma'lumot topilmadi</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Orqaga
          </button>
        </div>
      </div>
    );
  }

  const successRate = data?.examStatistics ? ((data?.examStatistics?.submittedTests / 25) * 100).toFixed(1) : 0;
  const fileUrl = getMediaUrl(data?.file);

  return (
    <div className="space-y-4 fixed top-0 left-0 z-50 w-full h-full bg-white p-6 overflow-y-auto">
      <div className="min-h-screen ">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="mb-6 border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-100">
            <div className={`h-2 bg-gradient-to-r ${getDegreeColor(data?.degree as CertificateDegreeType)}`}></div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${getDegreeColor(
                      data?.degree as CertificateDegreeType
                    )} flex items-center justify-center shadow-lg`}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {data?.user?.firstname} {data?.user?.lastname}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Medal className={`w-5 h-5 ${getDegreeIcon(data?.degree as CertificateDegreeType)}`} />
                      <span className={`font-semibold ${getDegreeIcon(data?.degree as CertificateDegreeType)}`}>{data?.degree} Darajasi</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Tasdiqlangan</span>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Telefon</p>
                    <p className="font-medium text-gray-800">{data?.user?.phone || data?.user?.email || 'Mavjud emas'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Manzil</p>
                    <p className="font-medium text-gray-800 text-sm leading-relaxed">
                      {data?.user?.address
                        ? `${data?.user?.address.region}, ${data?.user?.address.district}, ${data?.user?.address.neighborhood}`
                        : 'Mavjud emas'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course and Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Kurs</p>
                  <h3 className="text-xl font-bold text-gray-800">{data?.course?.title}</h3>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                <p className="text-xs text-gray-600 mb-1">Kurs ID</p>
                <p className="text-sm font-mono text-gray-700">{data?.course?.id}</p>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Statistika</p>
                  <h3 className="text-xl font-bold text-gray-800">Imtihon Natijalari</h3>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-sm text-gray-600">Jami testlar</span>
                  <span className="text-lg font-bold text-blue-700">{25}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-sm text-gray-600">Topshirilgan</span>
                  <span className="text-lg font-bold text-green-700">{data?.examStatistics?.submittedTests}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <span className="text-sm text-gray-600">Muvaffaqiyat darajasi</span>
                  <span className="text-lg font-bold text-purple-700">{successRate}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getDegreeColor(
                      data?.degree as CertificateDegreeType
                    )} transition-all duration-500 rounded-full`}
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate File */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Sertifikat Fayli</p>
                  <p className="text-sm font-mono text-gray-700 mt-1">{fileUrl}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  asChild
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <a href={fileUrl} download>
                    Yuklab olish
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <iframe src={fileUrl} className="w-full h-[600px] border border-gray-200 rounded-lg" title="Sertifikat PDF" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
