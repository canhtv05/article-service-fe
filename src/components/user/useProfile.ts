import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { Gender, Status } from '@/enums';
import { formatFullName, updateUserSchema } from '@/lib/validation';
import { ApiResponse, UserResponse } from '@/types';
import { handleMutationError } from '@/utils/handleMutationError';
import { httpRequest } from '@/utils/httpRequest';
import { useAuthStore } from '@/zustand/authStore';
import { useFormErrors } from '@/hooks/useFormErrrors';

interface UserProfileValue {
  fullName: string | undefined;
  profilePicture: string | undefined;
  gender: Gender | undefined;
  phone: string | undefined;
}

export const useProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [value, setValue] = useState<UserProfileValue>({
    fullName: user?.fullName ?? '',
    gender: user?.gender ?? Gender.UNKNOWN,
    profilePicture: user?.profilePicture ?? '',
    phone: user?.phone ?? '',
  });

  const [tmpImg, setTmpImg] = useState<string>(user?.profilePicture ?? '');
  const [file, setFile] = useState<File>();

  const { clearErrors, errors, handleZodErrors } = useFormErrors<UserProfileValue>();

  const updateProfileMutation = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (data: FormData) => {
      const res = await httpRequest.patch<ApiResponse<UserResponse>>('/auth/me/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    },
    onSuccess: (data) => {
      toast.success(Status.UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['current-user, authenticate'] });
      setUser(data.data.data, true);
      setFile(undefined);

      setValue({
        fullName: data.data.data.fullName,
        gender: data.data.data.gender,
        profilePicture: data.data.data.profilePicture,
        phone: data.data.data.phone,
      });

      setTmpImg(data.data.data.profilePicture ?? '');
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });

  const isDataUpdateEqual = useCallback(() => {
    return user?.fullName === value.fullName && user?.gender === value.gender && user?.phone === value.phone && !file;
  }, [file, user?.fullName, user?.gender, user?.phone, value.fullName, value.gender, value.phone]);

  const handleUpdate = useCallback(async () => {
    const isUnchanged = isDataUpdateEqual();

    if (isUnchanged) {
      toast.warning('Không có thay đổi nào');
      return;
    }

    try {
      await updateUserSchema.parseAsync(value);

      const formData = new FormData();

      formData.append('fullName', value.fullName ?? '');
      formData.append('gender', value.gender ?? '');
      formData.append('phone', value.phone ?? '');

      if (file) {
        formData.append('profilePictureFile', file);
      }

      clearErrors();

      updateProfileMutation.mutate(formData);
    } catch (error) {
      handleZodErrors(error);
    }
  }, [isDataUpdateEqual, clearErrors, file, handleZodErrors, updateProfileMutation, value]);

  const handleBlur = () => {
    setValue((prev) => ({
      ...prev,
      fullName: formatFullName(String(prev.fullName)),
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeImg = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Chỉ hỗ trợ các định dạng ảnh JPG, JPEG, PNG, hoặc WEBP');
      return;
    }

    setFile(file);
    const objectURL = URL.createObjectURL(file);
    setTmpImg(objectURL);
  };

  const handleClearImage = useCallback(() => {
    setTmpImg((prev) => {
      URL.revokeObjectURL(prev);
      return value.profilePicture ?? '';
    });
    setFile(undefined);
  }, [value.profilePicture]);

  return {
    value,
    setValue,
    handleBlur,
    handleChange,
    handleUpdate,
    errors,
    user,
    handleChangeImg,
    handleClearImage,
    handleFileChange,
    tmpImg,
    inputRef,
    isDataUpdateEqual,
  };
};
