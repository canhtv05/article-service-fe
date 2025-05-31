import images from '@/assets/imgs';

const UserTopArticles = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={images.fallbackNoData} alt="no data" className="w-[50%] h-[50%]" />
    </div>
  );
};

export default UserTopArticles;
