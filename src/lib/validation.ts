import { z } from 'zod/v4';

export const addOrUpdateTopicSchema = z.object({
  name: z.string().min(1, { message: 'Tên không được để trống' }),
  royaltyFee: z.number().min(0, { message: 'Phí bản quyền không được nhỏ hơn -1' }),
  description: z.string().min(1, { message: 'Mô tả không được để trống' }),
});
