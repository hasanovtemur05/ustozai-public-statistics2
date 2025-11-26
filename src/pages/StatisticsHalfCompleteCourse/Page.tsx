import { useEffect, useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import regions from '../../db/regions.json';
import districtData from '../../db/districts.json';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';
import { useUserByHalfCourse } from 'modules/statistic-half-complete-course/hooks/useList';
import { IUserHalfCompleteCourse, UserTypeFilter } from 'modules/statistic-half-complete-course/types';
import { DateRange } from 'react-day-picker';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { DateRangePicker } from 'components/DataRangePicker';
import { useSearchParams } from 'react-router-dom';
import UsersProgress from 'components/charts/UsersProgress';
import UserActivity from 'components/charts/UserActivity';
import CustomPagination from 'components/shared/pagination';
import { Input } from 'components/ui/input';
import { Search } from 'lucide-react';
import { Button } from 'components/ui/button';

export type CustomSelectType = { name: string; id: string | number; disabled?: boolean; [key: string]: any };

const typeFilterOptions: CustomSelectType[] = [
  { name: 'Hammasi', id: 'ALL' },
  { name: 'Kurs bo\'yicha', id: 'COURSE' },
  { name: 'Faollik bo\'yicha', id: 'ACTIVITY' },
];

const UsersHalfComplitedCoursesPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IUserHalfCompleteCourse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [course, setCourse] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [typeFilter, setTypeFilter] = useState<UserTypeFilter>('ALL');
  const [districts, setDistricts] = useState<CustomSelectType[]>([]);
  const [courses, setCourses] = useState<CustomSelectType[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserHalfCompleteCourse>();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  // Search states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();

  const {
    data: categories,
    isLoading,
    pagenationInfo,
  } = useUserByHalfCourse(currentPage, pageSize, typeFilter, course, region, district, validDate, searchQuery);

 

  const { data: coursesList } = useCoursesList({ isEnabled: !!categories });

  // Debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const getRowData = (info: IUserHalfCompleteCourse) => {
    setData(info);
  };

  const handleShowChart = (user: IUserHalfCompleteCourse) => {
    if (user) {
      setSearchParams({
        userId: user?.userId,
      });
      setSelectedUser(user);
    }
  };

  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setCourse('');
    setRegion('');
    setDistrict('');
    setTypeFilter('ALL');
    setDate(getDefaultDateRange());
    setCurrentPage(1);
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dars yarmiga kelgan talabalar</h1>

      <div className="flex flex-col gap-4 mb-4">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-semibold">Jami {pagenationInfo?.count || 0} ta</h2>
          <SelectWithoutForm
            data={typeFilterOptions}
            placeholder="Turi bo'yicha..."
            value={typeFilter}
            onChange={(value) => {
              setTypeFilter(value as UserTypeFilter);
              setCurrentPage(1);
            }}
          />
          <SelectWithoutForm
            data={courses}
            placeholder="Kursni bo'yicha..."
            onChange={(value) => {
              setCourse(value);
              setCurrentPage(1);
            }}
          />
          <SelectWithoutForm
            data={regions}
            placeholder="Viloyatlar bo'yicha..."
            onChange={(value) => {
              setRegion(value);
              setDistrict(''); // Viloyat o'zgarganda tumanni tozalash
              setCurrentPage(1);
            }}
            isTitleKey={true}
          />
          <SelectWithoutForm
            data={districts}
            placeholder="Tuman/shahar bo'yicha..."
            onChange={(value) => {
              setDistrict(value);
              setCurrentPage(1);
            }}
            isTitleKey={true}
          />
          <DateRangePicker
            date={date}
            setDate={(newDate) => {
              setDate(newDate);
              setCurrentPage(1);
            }}
          />
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Ism, familiya yoki telefon bo'yicha qidirish..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          {/* Clear filters button */}
          {(searchInput || course || region || district || typeFilter !== 'ALL') && (
            <Button onClick={clearFilters} variant={'destructive'}>
              Tozalash
            </Button>
          )}
        </div>
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

      {userId && selectedUser && (
        <div>
          {/* Show activity details if user has activity, otherwise show course progress */}
          {selectedUser.activity &&
           (selectedUser.activity.fortuna > 0 ||
            selectedUser.activity.portfolio > 0 ||
            selectedUser.activity.battle > 0) ? (
            <UserActivity
              userId={selectedUser.userId}
              userName={`${selectedUser.firstname} ${selectedUser.lastname}`}
              onClose={() => {
                setSearchParams({});
                setSelectedUser(undefined);
              }}
            />
          ) : (
            <UsersProgress
              user={selectedUser}
              onClose={() => {
                setSearchParams({});
                setSelectedUser(undefined);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UsersHalfComplitedCoursesPage;
