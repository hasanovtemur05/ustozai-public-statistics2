import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, RichTextEditor, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import useFileUploader from 'hooks/useFileUploader';
import { useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import NumberTextField from 'components/fields/Number';
import { useCreateMarketTask } from 'modules/market-taskts/hooks/useCreate';
import { useEditMarketTask } from 'modules/market-taskts/hooks/useEdit';
import { IMarketTask, IMarketTaskInput } from 'modules/market-taskts/types';

interface IProps {
  product?: IMarketTask;
  setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ product, setSheetOpen }: IProps) {
  const [state, setState] = useState(false);

  const { uploadFile } = useFileUploader();

  const { triggerCreate, isPending: isInfoCreatePending } = useCreateMarketTask({
    setSheetOpen,
  });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditMarketTask({
    id: product?.id,
    setSheetOpen,
  });

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          title: product?.title,
          photo: product?.photo,
          points: +product?.points,
          description: product?.description,
        }
      : {
          title: '',
          photo: '',
          description: '',
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      const firstValue = await uploadFile<IMarketTaskInput>(formValues, 'photo');
      const data = {
        ...firstValue,
        points: +firstValue.points,
      };
      if (product) {
        triggerEdit(data);
      } else {
        triggerCreate(data);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setState(false);
    }
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          <TextField name="title" label="Topshiriq  nomi" required />

          <NumberTextField name="points" placeholder="Topshiriq points" label="Topshiriq points" required />

          <FileField name={`photo`} label={`Topshiriq rasmi `} />

          <RichTextEditor name="description" label="Topshiriq tarifi" />
        </div>
        {product ? (
          <LoadingButton isLoading={isNotificationEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
