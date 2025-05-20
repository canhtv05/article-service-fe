import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FieldsSelect from '../FieldsSelect';
import { formatCurrencyVND } from '@/lib/utils';
import StatusBadge from '../StatusBadge';
import Tooltip from '../Tooltip';
import { useContext } from 'react';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';

const PRTableWithPagination = () => {
  const topics = useContext(PRTopicManagementContext);

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {topics?.titlesTable.map((title, index) => (
                <TableHead className={`${index === 0 || index === 1 ? 'pl-4' : ''}`} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics?.data &&
              topics?.data.map((topic, index) => (
                <TableRow key={topic.ma} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="pl-4">{topic.ma}</TableCell>
                  <TableCell className="font-medium">{topic.topic_name}</TableCell>
                  <TableCell>{formatCurrencyVND(topic.royalty)}</TableCell>
                  <TableCell>{topic.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={topic.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 cursor-pointer">
                      {topics.tooltips.map((item, index) => (
                        <Tooltip
                          key={index}
                          toolTipContent={item.content}
                          toolTipTrigger={<item.icon className="size-5" />}
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex md:flex-row flex-col gap-5 mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">998</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">999</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1000</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div>
          <FieldsSelect
            placeholder="Số trang"
            defaultValue="10"
            label="Số trang"
            data={[
              { label: '10 / trang', value: 10 },
              { label: '20 / trang', value: 20 },
              { label: '30 / trang', value: 30 },
              { label: '50 / trang', value: 50 },
              { label: '100 / trang', value: 100 },
            ]}
            value={topics?.perPage}
            setValue={(val) => {
              if (topics) {
                topics.setPerPage(val);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PRTableWithPagination;
