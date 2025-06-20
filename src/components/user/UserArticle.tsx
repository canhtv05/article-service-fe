import { Avatar } from '../ui/avatar';
import RenderIf from '../RenderIf';
import MarkdownRenderer from '../MarkdownRender';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { formatDateTime } from '@/lib/utils';
import useViewport from '@/hooks/useViewport';
import { useSidebar } from '../ui/sidebar';
import Image from '../Image';

const UserArticle = ({ status }: { status?: string }) => {
  const { width } = useViewport();
  const { open } = useSidebar();
  const { data } = useQuery({
    queryKey: ['my-articles', status],
    queryFn: async () => {
      const res = await httpRequest.get('/admin/bai-viet/bai-viet-cua-toi', {
        params: {
          status,
        },
      });
      return res.data;
    },
  });

  return (
    <div
      style={{
        ...(open ? { width: width - 320 } : {}),
      }}
    >
      {data && data.length > 0 ? (
        data.map((d, idx) => (
          <div key={idx} className="p-5 border rounded-md my-5">
            <div className="flex md:flex-row flex-col justify-between items-start">
              <div className="flex gap-2">
                <div className="flex justify-center">
                  <Avatar className="size-[45px]">
                    <Image src={d.profilePicture} alt={d.authorName} />
                  </Avatar>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <span className="font-semibold text-[14px] text-foreground/80">{d?.authorName}</span>
                  <span className="font-medium text-foreground/60 text-[14px]">
                    {d?.impactDate && (
                      <RenderIf value={true}>{formatDateTime(d.impactDate, 'dd/MM/yyyy HH:mm:ss')}</RenderIf>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end gap-2 md:w-auto w-full md:mt-0 mt-2">
                {/* <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
              Tháng 10 (01/10/2025 - 30/10/2025)
            </Badge> */}
                <span className="text-[12px] border p-2 break-words max-w-[300px] bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-lg">
                  {d?.campaignName}
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-5 font-bold">{d?.title}</div>

            <div className="w-full mt-4">
              <MarkdownRenderer>{d?.content}</MarkdownRenderer>
            </div>
          </div>
        ))
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default UserArticle;
