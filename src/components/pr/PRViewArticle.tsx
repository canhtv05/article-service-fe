import DialogLink from '../DialogLink';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import MarkdownRenderer from '../MarkdownRender';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import RenderIf from '../RenderIf';

const PRViewArticle = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['markdown'],
    queryFn: async () => {
      const response = await axios.get('/markdown.md');
      return response.data;
    },
  });

  return (
    <DialogLink open={true} title="Xem bài viết" outline>
      <RenderIf value={!isLoading}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="flex justify-center">
              <Avatar className="size-[45px]">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-semibold text-[14px] text-foreground/80">ShadCN PH123456</span>
              <span className="font-medium text-foreground/60 text-[14px]">17/10/2005 17:10</span>
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:items-start items-end gap-2">
            <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
              Tháng 10 (01/10/2005 - 30/10/2005)
            </Badge>
            <span className="text-[12px] border p-2 break-words max-w-[300px] bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi rem quasi illum. Cupiditate maxime sint rem
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-5 font-bold">Tương Lai Công Nghệ Xanh</div>

        <div className="w-full mt-4">
          <MarkdownRenderer>{data}</MarkdownRenderer>
        </div>
      </RenderIf>
      <RenderIf value={isLoading}>
        <div className="w-full max-w-sm rounded-md p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-foreground/50"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-foreground/50"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-foreground/50"></div>
                  <div className="col-span-1 h-2 rounded bg-foreground/50"></div>
                </div>
                <div className="h-2 rounded bg-foreground/50"></div>
              </div>
            </div>
          </div>
        </div>
      </RenderIf>
    </DialogLink>
  );
};

export default PRViewArticle;
