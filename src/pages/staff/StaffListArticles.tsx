import { useSelector } from 'react-redux';

import ListArticles from '@/components/staff/StaffListArticles';
import useViewport from '@/hooks/useViewport';
import StaffListArticlesProvider from '@/contexts/provider/staff/StaffListArticlesProvider';
import StaffFilterListArticleProvider from '@/components/staff/StaffFilterListArticleProvider';
import { cn } from '@/lib/utils';

const StaffListArticles = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <StaffListArticlesProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <StaffFilterListArticleProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <ListArticles />
        </div>
      </div>
    </StaffListArticlesProvider>
  );
};

export default StaffListArticles;
