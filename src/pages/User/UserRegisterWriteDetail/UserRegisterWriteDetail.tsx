import { List } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import StatusBadge from '@/components/StatusBadge';
import { StatusRegistration } from '@/enums';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { handleMutationError } from '@/utils/handleMutationError';
import { toast } from 'sonner';
import { useAuthStore } from '@/zustand/authStore';

interface SelectValue {
  id: string;
  name: string;
  check: boolean;
}

const UserRegisterWriteDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const [selected, setSelected] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ['/dot-bai-viet/chi-tiet', id],
    queryFn: async () => {
      const res = await httpRequest.get(`/dot-bai-viet/chi-tiet/${id}`);
      return res.data;
    },
    retry: false,
  });

  const { data: select } = useQuery<SelectValue[]>({
    queryKey: ['/chu-de/danh-sach-chu-de3', user?.id, id],
    queryFn: async () => {
      const res = await httpRequest.get(`/chu-de/danh-sach-chu-de3`, {
        params: {
          userId: user?.id,
          campaignId: id,
        },
      });
      return res.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (select) {
      const checkedIds = select.filter((s) => s.check).map((s) => s.id);
      setSelected(checkedIds);
    }
  }, [select]);

  const regisMutation = useMutation({
    mutationKey: ['regis-campaign'],
    mutationFn: async (topicId: string) => {
      const res = await httpRequest.post('/dot-bai-viet/dang-ki', {
        writingCampaignId: id,
        topicId,
      });

      return res.data;
    },
  });

  const handleRegis = async () => {
    try {
      for (const item of selected) {
        await regisMutation.mutateAsync(item);
      }
      queryClient.invalidateQueries({ queryKey: ['/chu-de/danh-sach-chu-de3'] });
      toast.success('Đăng ký thành công');
      setSelected([]);
    } catch (error) {
      handleMutationError(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Đăng ký viết bài</span>
          <StatusBadge status={StatusRegistration.OPEN} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col justify-end">
          <Label htmlFor="name" className="font-bold mb-2 leading-5">
            Tên đợt:
          </Label>
          <Input id="name" value={data?.name ?? ''} disabled />
        </div>
      </div>

      <div>
        <Label className="font-semibold">Chủ đề:</Label>
        <p className="mt-2 text-sm text-muted-foreground">Đã chọn: {selected.length} chủ đề</p>

        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => setSelected(select?.map((tech) => tech.id) || [])}>
            Chọn hết
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelected([])}>
            Bỏ chọn hết
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-3 border p-4 rounded-md">
          {select &&
            select.map(({ name, id }, index) => {
              const isChecked = selected.includes(id) || select[index].check === true;

              return (
                <label
                  key={id}
                  htmlFor={id}
                  className="flex items-center gap-2 p-3 bg-ring/20 rounded-md cursor-pointer break-words"
                >
                  <Checkbox
                    id={id}
                    value={id}
                    checked={isChecked}
                    disabled={select[index].check === true}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelected((prev) => [...prev, id]);
                      } else {
                        setSelected((prev) => prev.filter((tech) => tech !== id));
                      }
                    }}
                  />
                  <span className="text-sm font-medium leading-snug break-words overflow-hidden">{name}</span>
                </label>
              );
            })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="default" className="rounded-full" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
        <Button customize="default" className="rounded-full" disabled={selected.length <= 1} onClick={handleRegis}>
          Lưu đăng ký
        </Button>
      </div>
    </div>
  );
};

export default UserRegisterWriteDetail;
