import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { useUserCertificateList } from 'modules/user-certificate/hooks/useList';
import { IUserCertificate } from 'modules/user-certificate/types';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import regions from '../../db/regions.json';
import districtData from '../../db/districts.json';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import http from 'services/api';
import { Button } from 'components/ui/button';
import { DateRange } from 'react-day-picker';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { DateRangePicker } from 'components/DataRangePicker';
import CustomPagination from 'components/shared/pagination';
import { Search, Download, X } from 'lucide-react';
import { Input } from 'components/ui/input';
import { useSearchParams } from 'react-router-dom';
import VerifyCertificate from 'components/charts/VarifyCertificate';

export type CustomSelectType = { name: string; id: string | number; disabled?: boolean; [key: string]: any };

const UsersCertificatesPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IUserCertificate>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [course, setCourse] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUserCertificate>();

  const [districts, setDistricts] = useState<CustomSelectType[]>([]);
  const [courses, setCourses] = useState<CustomSelectType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const uniqueId = searchParams.get('uniqueId');

  // Search states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const [isDownloading, setIsDownloading] = useState(false);
  const validDate = date?.from && date.to ? date : getDefaultDateRange();

  const {
    data: categories,
    isLoading,
    pagenationInfo,
  } = useUserCertificateList(currentPage, pageSize, course, region, district, validDate, searchQuery);
  const { data: coursesList } = useCoursesList({ isEnabled: !!categories });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowChart = (user: IUserCertificate) => {
    if (user) {
      setSearchParams({
        uniqueId: user.uniqueId + '',
      });
      setSelectedUser(user);
    }
  };

  const columns = createDataColumns({
    currentPage,
    handleShowChart,
  });

  useEffect(() => {
    let newArr: CustomSelectType[] = [];
    coursesList.forEach((el) =>
      newArr.push({
        name: el.title,
        id: el.id,
      })
    );
    setCourses(newArr);
  }, [coursesList]);

  useEffect(() => {
    if (region) {
      const filtered = districtData.filter((c) => c.region_name === region);
      setDistricts(filtered);
    }
  }, [region]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setCourse('');
    setRegion('');
    setDistrict('');
    setDate(getDefaultDateRange());
    setCurrentPage(1);
  };

  const handleExportExcel = async () => {
    try {
      setIsDownloading(true);

      const params = new URLSearchParams();
      params.append('pageNumber', '1');
      params.append('pageSize', pageSize + '');

      if (course) params.append('courseId', course);
      if (region) params.append('region', region);
      if (district) params.append('district', district);
      if (searchQuery) params.append('search', searchQuery);

      if (validDate?.from) {
        params.append('startDate', validDate.from.toISOString().split('T')[0]);
      }
      if (validDate?.to) {
        params.append('endDate', validDate.to.toISOString().split('T')[0]);
      }

      const response = await http.get(`/certificate/users/export/excel?${params.toString()}`, {
        responseType: 'blob',
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificates_${new Date().getTime()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Sertifikat olgan talabalar</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2>Jami {pagenationInfo?.count || 0} ta </h2>
          <SelectWithoutForm data={courses} placeholder="Kursni  bo'yicha..." onChange={(value) => setCourse(value)} />
          <SelectWithoutForm data={regions} placeholder="Viloyatlar  bo'yicha..." onChange={(value) => setRegion(value)} isTitleKey={true} />
          <SelectWithoutForm
            data={districts}
            placeholder="Tuman/shahar bo'yicha..."
            onChange={(value) => setDistrict(value)}
            isTitleKey={true}
          />

          <DateRangePicker date={date} setDate={setDate} />

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Ism, telefon, kurs bo'yicha qidirish..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          {/* Clear filters button */}
          {(searchInput || course || region || district) && (
            <Button onClick={clearFilters} variant={'destructive'}>
              <X />
            </Button>
          )}
        </div>
        <Button onClick={handleExportExcel} disabled={isDownloading} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          {isDownloading ? 'Yuklanmoqda...' : 'Excel yuklash'}
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={categories} />

          <CustomPagination
            currentPage={currentPage}
            totalItems={pagenationInfo.count}
            itemsPerPage={pageSize}
            onPageChange={handlePageChange}
            onItemsPerPageChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
            itemsPerPageOptions={[10, 20, 50, 100]}
          />
        </>
      )}

      {uniqueId && selectedUser && (
        <div>
          <VerifyCertificate
            user={selectedUser}
            onClose={() => {
              setSearchParams({});
              setSelectedUser(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UsersCertificatesPage;
