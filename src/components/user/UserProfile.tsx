import { Camera, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Gender } from '@/enums';
import RenderIf from '@/components/RenderIf';
import FieldsSelectLabel from '../FieldsSelectLabel';
import Image from '../Image';
import InputLabel from '../InputLabel';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import DialogLink2 from '../DialogLink2';
import { useProfile } from './useProfile';
import { useEffect } from 'react';

const genderData = [
  { label: 'Nam', value: Gender.MALE },
  { label: 'Nữ', value: Gender.FEMALE },
];

const UserProfile = () => {
  const {
    errors,
    user,
    handleBlur,
    handleChange,
    handleUpdate,
    setValue,
    value: values,
    handleChangeImg,
    handleClearImage,
    handleFileChange,
    tmpImg,
    inputRef,
    isDataUpdateEqual,
  } = useProfile();

  const { ConfirmDialog, openDialog } = useConfirmDialog({
    typeTitle: 'chỉnh sửa',
    onConfirm: handleUpdate,
  });

  useEffect(() => {
    if (user) {
      setValue({
        fullName: user.fullName ?? '',
        gender: user.gender ?? Gender.UNKNOWN,
        profilePicture: user.profilePicture ?? '',
        phone: user.phone ?? '',
      });
    }
  }, [setValue, user]);

  return (
    <DialogLink2 title="Hồ sơ cá nhân">
      <form
        className="px-5 py-5 flex md:flex-row flex-col md:gap-20 gap-10 justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          openDialog();
        }}
      >
        <div className="flex flex-col gap-5 items-center">
          <div className="relative">
            <Image src={tmpImg} alt={values?.fullName} className="md:size-[140px] sm:size-[120px] size-[100px]" />
            <input type="file" className="hidden" accept="image/*" ref={inputRef} onChange={handleFileChange} />
            <Button
              size={'icon'}
              type="button"
              className="absolute bottom-0 right-0 rounded-full cursor-pointer border bg-background hover:bg-muted"
              onClick={handleChangeImg}
            >
              <Camera className="text-foreground size-4" />
            </Button>
            <RenderIf value={tmpImg !== values.profilePicture}>
              <button
                type="button"
                className="absolute top-2 right-2 bg-background cursor-pointer p-1 rounded-full"
                onClick={handleClearImage}
              >
                <X className="text-foreground size-3" />
              </button>
            </RenderIf>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <InputLabel
            type="text"
            id="email"
            name="email"
            label="Email:"
            placeholder="Nhập email:"
            value={user?.email ?? ''}
            disabled
          />
          <InputLabel
            type="text"
            id="name"
            name="fullName"
            label="Tên người dùng:"
            placeholder="Nhập tên người dùng"
            value={values?.fullName ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.fullName}
          />
          <FieldsSelectLabel
            id="gender"
            placeholder="Giới tính"
            label="Giới tính:"
            labelSelect="Giới tính"
            data={genderData}
            value={values?.gender ?? Gender.UNKNOWN}
            onChange={(val) => setValue((prev) => ({ ...prev, gender: val as Gender }))}
          />

          <InputLabel
            type="text"
            id="phone"
            name="phone"
            label="Số điện thoại:"
            placeholder="Nhập số điện thoại"
            value={values?.phone ?? ''}
            onChange={handleChange}
            errorText={errors.phone}
          />
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={'ghost'} className="cursor-pointer">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isDataUpdateEqual()} customize={'default'}>
              <span className="text-white cursor-pointer">Cập nhật</span>
            </Button>
          </div>
        </div>
      </form>
      <ConfirmDialog />
    </DialogLink2>
  );
};

export default UserProfile;
