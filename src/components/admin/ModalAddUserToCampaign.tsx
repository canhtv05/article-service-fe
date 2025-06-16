import DialogLink from '../DialogLink';
import AddUserToCampaign from './AddUserToCampaign';

const ModalAddUserToCampaign = () => {
  return (
    <DialogLink open={true} title="Thêm giảng viên vào đợt viết bài" outline>
      <div className="mt-5">
        <AddUserToCampaign />
      </div>
    </DialogLink>
  );
};

export default ModalAddUserToCampaign;
