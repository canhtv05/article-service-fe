import ListArticles from '@/components/staff/StaffListArticles';
import useViewport from '@/hooks/useViewport';
import { useIsMobile } from '@/hooks';
import StaffListArticlesProvider from '@/contexts/provider/staff/StaffListArticlesProvider';
import StaffFilterListArticleProvider from '@/components/staff/StaffFilterListArticleProvider';

const StaffListArticles = () => {
  const { width } = useViewport();
  const isMobile = useIsMobile();

  return (
    <StaffListArticlesProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <StaffFilterListArticleProvider />
        <div
          className="rounded-xl md:min-h-min flex-1 border w-full"
          style={{
            width: isMobile ? '100%' : width - 300,
          }}
        >
          <ListArticles />
        </div>
      </div>
    </StaffListArticlesProvider>
  );
};

export default StaffListArticles;
