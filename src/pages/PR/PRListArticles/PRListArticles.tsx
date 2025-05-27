import { useSelector } from 'react-redux';

import PRFilterArticleProvider from '@/components/pr/PRFilterArticleProvider';
import PRListArticlesProvider from '@/contexts/provider/pr/PRListArticlesProvider';
import ListArticles from '@/components/pr/PRListArticles';
import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';

const PRListArticles = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <PRListArticlesProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterArticleProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <ListArticles />
        </div>
      </div>
    </PRListArticlesProvider>
  );
};

export default PRListArticles;
