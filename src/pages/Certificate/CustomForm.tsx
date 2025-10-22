import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, SelectField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import { CertificateInputType, CertificateType } from 'modules/certificate/types';
import { useEditCertificate } from 'modules/certificate/hooks/useEdit';
import { useCreateCertificate } from 'modules/certificate/hooks/useCreate';
import { schema, useFormSchemaType } from './schema';
import { bannerTypeData } from 'constants/banner';

interface IProps {
  certificate?: CertificateType;
  setSheetOpen: (state: boolean) => void;
}
const degreeData = [{ type: "GOLD", name: "Oltin" }, { type: "SILVER", name: "Kumush" }, { type: "BRONZE", name: "Bronza" }]

export type SelectType = { name: string, type: string ,disabled?: boolean}
export default function CustomForm({
  certificate,
  setSheetOpen,
}: IProps) {

  const [coursesData, setCoursesData] = useState<SelectType[]>([])
  const [state, setState] = useState(false)
  const { uploadFile } = useFileUploader();
  const { triggerCreate, isPending: isInfoCreatePending } =
    useCreateCertificate({ setSheetOpen });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditCertificate({
    id: certificate?.id,
    setSheetOpen,
  });

  // get courses 
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: certificate
      ? {
        degree: certificate?.degree,
        photo: certificate?.photo,
        courseId: certificate?.course?.id
      }
      : {
        degree: '',
        photo: '',
        courseId: ''
      },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    try {
      setState(true)
      const values = await uploadFile<CertificateInputType>(formValues, 'photo');
      if (certificate) {
        triggerEdit(values);
      } else {
        triggerCreate(values);
      }
    } catch (error) {
      setState(false)
      alert("Aniqlanmagan hatolik!")
    }
  }

  useEffect(() => {
    let newArr: SelectType[] = [{
      name: "All",
      type: "all"
    }]
    coursesList.forEach(el => newArr.push({
      name: el.title, type: el.id,
    }))
    setCoursesData(newArr)
  }, [coursesList])

  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          <FileField name="photo" label="Malumot rasmi" />
          <SelectField
            name="degree"
            data={degreeData}
            placeholder="Darajani tanlang..."
            label="Darajani tanglang"
          />
          {
            loadingCourses && !certificate ? (<SelectField
              name="courseId"
              data={bannerTypeData}
              placeholder="Kurslar hali yuklanmagan..."
              label="Kurslar hali yuklanmagan"
            />) : (<SelectField
              name="courseId"
              data={coursesData}
              placeholder="Kursni tanlang..."
              label="Kursni tanglang"
            />)
          }
        </div>
        {certificate ? (
          <LoadingButton isLoading={isNotificationEditPending}>
            Tahrirlash
          </LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>
            Saqlash
          </LoadingButton>
        )}
      </form>
    </Form>
  );
}
