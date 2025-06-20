import DialogLink from '../DialogLink';
import { Avatar } from '../ui/avatar';
// import { Badge } from '../ui/badge';
import MarkdownRenderer from '../MarkdownRender';
import { useQuery } from '@tanstack/react-query';
import RenderIf from '../RenderIf';
import { ReactElement } from 'react';
import { httpRequest } from '@/utils/httpRequest';
import { formatDateTime } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import Image from '../Image';

const ViewArticle = ({ component }: { component?: ReactElement }) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`/admin/bai-viet/chi-tiet/${id}`],
    queryFn: async () => {
      const response = await httpRequest.get(`/admin/bai-viet/chi-tiet/${id}`);
      return response.data;
    },
  });

  return (
    <DialogLink open={true} title="Xem bài viết" outline component={component}>
      <RenderIf value={!isLoading}>
        <div className="flex md:flex-row flex-col justify-between items-start">
          <div className="flex gap-2">
            <div className="flex justify-center">
              <Avatar className="size-[45px]">
                <Image src={data?.author?.profilePicture} alt={data?.authorName} />
              </Avatar>
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="font-semibold text-[14px] text-foreground/80">{data?.authorName}</span>
              <span className="font-medium text-foreground/60 text-[14px]">
                {data?.createdAt && (
                  <RenderIf value={true}>{formatDateTime(data.createdAt, 'dd/MM/yyyy HH:mm:ss')}</RenderIf>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end gap-2 md:w-auto w-full md:mt-0 mt-2">
            {/* <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
              Tháng 10 (01/10/2025 - 30/10/2025)
            </Badge> */}
            <span className="text-[12px] border p-2 break-words max-w-[300px] bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-lg">
              {data?.campaignName}
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-5 font-bold">{data?.title}</div>

        <div className="w-full mt-4">
          <MarkdownRenderer>{data?.content}</MarkdownRenderer>
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

export default ViewArticle;
