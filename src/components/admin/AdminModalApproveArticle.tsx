import DialogCustom from '../DialogCustom';
import ViewArticle from '../pr/ViewArticle';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const Comp = () => {
  return (
    <div className="flex justify-end w-full flex-1 mr-5 gap-2 md:mt-0 mt-5">
      <DialogCustom
        component={<Textarea placeholder="Viết vào đây" defaultValue={'Đã đạt yêu cầu'} className="max-h-[150px]" />}
        onContinue={() => console.log(1)}
        title="Phê duyệt bài viết"
        triggerComponent={<Button customize={'default'}>Chấp nhận</Button>}
      />
      <DialogCustom
        component={<Textarea placeholder="Viết vào đây" defaultValue={'Chưa đạt yêu cầu'} className="max-h-[150px]" />}
        onContinue={() => console.log(1)}
        title="Phê duyệt bài viết"
        triggerComponent={<Button variant={'destructive'}>Từ chối</Button>}
      />
    </div>
  );
};

const AdminModalApproveArticle = () => {
  return (
    <div>
      <ViewArticle component={<Comp />} />
    </div>
  );
};

export default AdminModalApproveArticle;
