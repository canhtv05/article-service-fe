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
import { Status } from '@/enums';
import StatusBadge from '../StatusBadge';
const products = [
  {
    ma: 101,
    topic_name: 'Wireless Headphones',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 102,
    topic_name: 'Yoga Mat',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.PENDING,
  },
  {
    ma: 103,
    topic_name: 'Coffee Maker',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 104,
    topic_name: 'Running Shoes',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 105,
    topic_name: 'Smartwatch',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.INACTIVE,
  },
  {
    ma: 106,
    topic_name: 'Wireless Headphones',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 107,
    topic_name: 'Yoga Mat',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.PENDING,
  },
  {
    ma: 108,
    topic_name: 'Coffee Maker',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 109,
    topic_name: 'Running Shoes',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.ACTIVE,
  },
  {
    ma: 110,
    topic_name: 'Smartwatch',
    royalty: 30000,
    description: 'Mô tả',
    status: Status.INACTIVE,
  },
];
const PRTableWithPagination = () => {
  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">#</TableHead>
              <TableHead className="pl-4">Mã</TableHead>
              <TableHead>Tên chủ đề</TableHead>
              <TableHead>Nhuận bút</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.ma} className="odd:bg-muted/50">
                <TableCell className="pl-4">{index + 1}</TableCell>
                <TableCell className="pl-4">{product.ma}</TableCell>
                <TableCell className="font-medium">{product.topic_name}</TableCell>
                <TableCell>{formatCurrencyVND(product.royalty)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
                <TableCell>ok</TableCell>
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
            defaultValue="10 / trang"
            label="Số trang"
            data={[
              { label: '10 / trang' },
              { label: '20 / trang' },
              { label: '30 / trang' },
              { label: '50 / trang' },
              { label: '100 / trang' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PRTableWithPagination;
