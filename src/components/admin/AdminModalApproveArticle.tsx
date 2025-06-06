import { useMutation, useQueryClient } from '@tanstack/react-query';
import DialogCustom from '../DialogCustom';
import ViewArticle from '../pr/ViewArticle';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { httpRequest } from '@/utils/httpRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Status } from '@/enums';

const Comp = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleConfirm = async (url: string): Promise<unknown> => {
    const data = await httpRequest.get(`/${url}/${id}`);
    return data;
  };

  const handleApprovalArticle = useMutation({
    mutationFn: (url: string) => handleConfirm(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/bai-viet/bai-viet-cho-phe-duyet'] });
      toast.success(Status.UPDATE_SUCCESS);
      navigate('/admin/approve-article?page=1&size=5', { replace: true });
    },
    onError: () => {
      toast.error(Status.UPDATE_FAILED);
    },
  });

  return (
    <div className="flex justify-end w-full flex-1 mr-5 gap-2 md:mt-0 mt-5">
      <DialogCustom
        component={<Textarea placeholder="Viết vào đây" defaultValue={'Đã đạt yêu cầu'} className="max-h-[150px]" />}
        onContinue={() => handleApprovalArticle.mutate('admin/bai-viet/phe-duyet-bai-viet')}
        title="Phê duyệt bài viết"
        triggerComponent={<Button customize={'default'}>Chấp nhận</Button>}
      />
      <DialogCustom
        component={<Textarea placeholder="Viết vào đây" defaultValue={'Chưa đạt yêu cầu'} className="max-h-[150px]" />}
        onContinue={() => handleApprovalArticle.mutate('admin/bai-viet/tu-choi-bai-viet')}
        title="Phê duyệt bài viết"
        triggerComponent={<Button variant={'destructive'}>Từ chối</Button>}
      />
    </div>
  );
};

const AdminModalApproveArticle = () => {
  const { id } = useParams();

  return (
    <div>
      <ViewArticle component={<Comp id={id ?? ''} />} />
    </div>
  );
};

export default AdminModalApproveArticle;
