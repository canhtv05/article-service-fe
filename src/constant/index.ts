import {
  Archive,
  CalendarDays,
  ChartColumn,
  CircleCheck,
  ClockFading,
  File,
  FileUp,
  List,
  NotebookPen,
  NotepadText,
  Package,
  Pen,
  Send,
  Users,
} from 'lucide-react';

import images from '@/assets/imgs';
import type { MenuAuthorSwitchType, MenuSidebarItemType, StatisticalItemType } from '@/types';

export const menusAuthorSwitch: MenuAuthorSwitchType[] = [
  {
    image: images.admin,
    label: 'Quản trị viên',
    to: '/admin/chart',
  },
  {
    image: images.admin,
    label: 'Giảng viên bộ môn',
    to: '/user/register-to-write',
  },
  {
    image: images.admin,
    label: 'Trưởng phòng PR',
    to: '/pr/chart',
  },
  {
    image: images.admin,
    label: 'Nhân viên PR',
    to: '/staff/list-articles',
  },
];

export const menusSidebar: MenuSidebarItemType[] = [
  {
    label: 'Trưởng phòng PR',
    type: 'pr',
    children: [
      {
        label: 'Thống kê',
        to: '/pr/chart',
        type: 'chart',
        icon: ChartColumn,
      },
      {
        label: 'Quản lý chủ đề',
        to: '/pr/topic-management',
        type: 'topic-management',
        icon: NotepadText,
      },
      {
        label: 'Danh sách bài viết',
        to: '/pr/list-articles',
        type: 'list-articles',
        icon: List,
      },
      {
        label: 'Danh sách nhân viên',
        to: '/pr/staffs-pr',
        type: 'staffs-pr',
        icon: Users,
      },
    ],
  },
  {
    label: 'Quản trị viên',
    type: 'admin',
    children: [
      {
        label: 'Thống kê',
        to: '/admin/chart',
        type: 'chart',
        icon: ChartColumn,
      },
      {
        label: 'Phê duyệt bài viết',
        to: '/admin/approve-article',
        type: 'approve-article',
        icon: NotebookPen,
      },
      {
        label: 'Quản lý đợt đăng ký',
        to: '/admin/registration-period',
        type: 'registration-period',
        icon: CalendarDays,
      },
      {
        label: 'Kho lưu trữ',
        to: '/admin/archive',
        type: 'archive',
        icon: Package,
      },
      {
        label: 'Lịch sử phê duyệt',
        to: '/admin/approval-history',
        type: 'approval-history',
        icon: ClockFading,
      },
    ],
  },
  {
    label: 'Giảng viên bộ môn',
    type: 'user',
    children: [
      {
        label: 'Đăng ký viết bài',
        to: '/user/register-to-write',
        type: 'register-to-write',
        icon: CalendarDays,
      },
      {
        label: 'Tạo bài viết',
        to: '/user/create-article',
        type: 'create-article',
        icon: Pen,
      },
      {
        label: 'Danh sách bài viết',
        to: '/user/list-articles',
        type: 'list-articles',
        icon: List,
      },
      {
        label: 'Bài viết của tôi',
        to: '/user/my-articles',
        type: 'my-articles',
        icon: File,
      },
      {
        label: 'Lịch sử đã xem',
        to: '/user/viewed-history',
        type: 'viewed-history',
        icon: ClockFading,
      },
    ],
  },
  {
    label: 'Nhân viên PR',
    type: 'staff',
    children: [
      {
        label: 'Danh sách bài viết',
        to: '/staff/list-articles',
        type: 'list-articles',
        icon: List,
      },
    ],
  },
];

export const listStatistical: StatisticalItemType[] = [
  {
    label: 'Trưởng phòng PR',
    type: 'pr',
    children: [
      {
        label: 'Số bài viết đã gửi cho PR',
        count: 0,
        icon: Send,
        classText: 'text-yellow-500',
      },
      {
        label: 'Số bài viết đã đăng',
        count: 0,
        icon: CircleCheck,
        classText: 'text-green-500',
      },
      {
        label: 'Số bài viết không đăng',
        count: 0,
        icon: Archive,
        classText: 'text-red-500',
      },
    ],
  },
  {
    label: 'Quản trị viên',
    type: 'admin',
    children: [
      {
        label: 'Đã phê duyệt',
        count: 0,
        icon: CircleCheck,
        classText: 'text-green-500',
      },
      {
        label: 'Đã gửi',
        count: 0,
        icon: Send,
        classText: 'text-yellow-500',
      },
      {
        label: 'Không đăng',
        count: 0,
        icon: Archive,
        classText: 'text-red-500',
      },
      {
        label: 'Đã đăng',
        count: 0,
        icon: FileUp,
        classText: 'text-cyan-500',
      },
    ],
  },
];

export const chartData = (statistical: StatisticalItemType) => {
  const children = statistical.children || [];

  const colorVars = [
    'var(--color-safari)',
    'var(--color-chrome)',
    'var(--color-edge)',
    'var(--color-firefox)',
    'var(--color-other)',
  ];

  return children.map((child, index) => ({
    browser: child.label.toLowerCase(),
    label: child.label,
    count: child.count,
    fill: colorVars[index] || 'var(--color-other)',
  }));
};

export const fakeDataChart = [
  {
    label: 'Tháng 10 (01/10/2005 - 30/10/2005)',
    value: 'Tháng 10 (01/10/2005 - 30/10/2005)',
  },
];
