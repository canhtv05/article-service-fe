import PRFilterArticleProvider from '@/components/pr/PRFilterArticleProvider';
import PRListArticlesProvider from '@/contexts/provider/pr/PRListArticlesProvider';
import ListArticles from '@/components/pr/PRListArticles';
import useViewport from '@/hooks/useViewport';
import { useIsMobile } from '@/hooks';

const PRListArticles = () => {
  const { width } = useViewport();
  const isMobile = useIsMobile();

  return (
    <PRListArticlesProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterArticleProvider />
        <div
          className="rounded-xl md:min-h-min flex-1 border w-full"
          style={{
            width: isMobile ? '100%' : width - 300,
          }}
        >
          <ListArticles />
        </div>
      </div>
    </PRListArticlesProvider>
  );
};

export default PRListArticles;
