import { SquarePen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Tooltip from '../Tooltip';
import FallbackNoDataTable from '../FallbackNoDataTable';
import RenderIf from '../RenderIf';
import LoadingTable from '../LoadingTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { PRStaffsType } from '@/types';

const tooltips = [
  {
    content: 'Phân công',
    icon: SquarePen,
    type: 'update',
    className: 'hover:stroke-yellow-500',
  },
];

const titlesTable = ['#', 'Mã', 'Tên', 'Email', 'Hành động'];

const PRStaffsTable = () => {
  const { data, isLoading } = useQuery<PRStaffsType[]>({
    queryKey: ['staffs'],
    queryFn: async () => {
      const response = await axios.get('/data_staffs.json');
      return response.data;
    },
  });

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {titlesTable.map((title, index) => (
                <TableHead className={`${index === 0 || index === 1 ? 'pl-4' : ''}`} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <RenderIf value={!!isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!isLoading}>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((staff, index) => (
                  <TableRow key={index} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{index + 1}</TableCell>
                    <TableCell className="pl-4">{staff.ma}</TableCell>
                    <TableCell className="font-medium">{staff.fullName}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {tooltips.map((item, idx) => (
                          <Link to={`/pr/staffs-pr/assigned-article/${staff.ma}`} className="cursor-pointer" key={idx}>
                            <Tooltip
                              toolTipContent={item.content}
                              toolTipTrigger={<item.icon className={`size-5 ${item.className}`} />}
                            />
                          </Link>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={titlesTable.length} className="text-center">
                    <FallbackNoDataTable />
                  </TableCell>
                </TableRow>
              )}
            </RenderIf>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PRStaffsTable;
