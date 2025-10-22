import { z } from 'zod';


 export const schema = z.object({
    degree: z.string().min(3, { message: 'Malumot nomi talab qilinadi' }),
    photo: z
      .union([
        z.custom<File>(file => file instanceof File, {
          message: 'Rasm talab qilinadi',
        }),
        z.string(),
      ])
      .optional(),
      courseId: z.string().min(3, { message: 'Kurs idisi talab qilinadi' }),
  });
  
  export type useFormSchemaType = z.infer<typeof schema>;
  