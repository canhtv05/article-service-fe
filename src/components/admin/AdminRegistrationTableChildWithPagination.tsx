import { useContext } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FallbackNoDataTable from '../FallbackNoDataTable';
import { AdminRegistrationChildContext } from '@/contexts/context/admin/AdminRegistrationChildContext';
import cookieUtil from '@/utils/cookieUtil';
import { AdminRegistrationChildType } from '@/types';
import { httpRequest } from '@/utils/httpRequest';
import { useQuery } from '@tanstack/react-query';

const AdminRegistrationTableChildWithPagination = () => {
  const registrationPeriodChild = useContext(AdminRegistrationChildContext);

  const { data: users } = useQuery<AdminRegistrationChildType[]>({
    queryKey: ['/dot-bai-viet/danh-sach-giang-vien-dk'],
    queryFn: async () => {
      const response = await httpRequest.get(
        `/dot-bai-viet/danh-sach-giang-vien-dk/${cookieUtil.getStorage().parentId}`,
      );
      return response.data;
    },
  });

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {registrationPeriodChild?.titlesTable.map((title, index) => (
                <TableHead className={index === 0 || index === 1 ? 'pl-4' : ''} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((registration, index) => (
                <TableRow key={index} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="font-medium">{registration.authorName}</TableCell>
                  <TableCell className="font-medium">{registration.topicName}</TableCell>
                  <TableCell>{registration.assignedArticleCount || 'Chưa phân công'}</TableCell>
                  {/* <TableCell>
                    <div className="flex gap-4">
                      {registrationPeriodChild?.tooltips.map((item, idx) => (
                        <Fragment key={idx}>
                          <RenderIf value={item.type === 'assign_topic'}>
                            <Link
                              state={{ background: location }}
                              to={`/add/users-to-campaign/${registration.id}`}
                              className="cursor-pointer"
                            >
                              <Tooltip
                                toolTipContent={item.content}
                                toolTipTrigger={<item.icon className={item.className} />}
                              />
                            </Link>
                          </RenderIf>
                        </Fragment>
                      ))}
                    </div>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={registrationPeriodChild?.titlesTable.length} className="text-center">
                  <FallbackNoDataTable />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRegistrationTableChildWithPagination;
