import { LucideIcon } from 'lucide-react';
import type { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react';

export type LayoutComponent = ComponentType<{ children: ReactNode }>;

export type RouteComponent = ComponentType<unknown>;

export type DialogLinkProps = {
  children: React.ReactNode;
  title: string;
  outline?: boolean;
  open: boolean;
};

export type MenuAuthorSwitchType = {
  image: string;
  label: string;
  to: string;
};

export type RouteType = {
  path: string;
  component: RouteComponent;
  layout?: null | LayoutComponent;
  children?: {
    path: string;
    component: RouteComponent;
  }[];
};

export type ViewportType = {
  width: number;
  height: number;
};

export type MenuSidebarChildType = {
  label: string;
  to: string;
  type: string;
  icon: LucideIcon;
};

export type MenuSidebarItemType = {
  label: string;
  type: string;
  children: MenuSidebarChildType[];
};

export type StatisticalChildType = {
  label: string;
  count: number;
  icon: LucideIcon;
  classText: string;
};

export type StatisticalItemType = {
  label: string;
  type: string;
  children: StatisticalChildType[];
};

export type ChartDataType = {
  label: string;
  count: number;
  fill?: string;
  dataKey?: string;
  color?: string;
};

export type FieldsSelectType = {
  label: string;
  value: string | number;
};

export type TopicType = {
  ma: string;
  topic_name: string;
  royalty: number;
  description: string;
  status: string;
};

export type TopicFilterType = {
  topic_name: string;
  status: string | undefined;
  from: number | undefined;
  to: number | undefined;
};

export type AddOrUpdateTopicType = {
  title: string;
  royalty: number | undefined;
  description: string;
};

export type TopicContextType = {
  data: TopicType[] | undefined;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
  tooltips: {
    content: string;
    icon: LucideIcon;
    type: string;
  }[];
  valueFilter: TopicFilterType;
  setValueFilter: Dispatch<SetStateAction<TopicFilterType>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  dataAddOrUpdate: AddOrUpdateTopicType;
  setDataAddOrUpdate: Dispatch<SetStateAction<AddOrUpdateTopicType>>;
  handleAdd: VoidFunction;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleToggleStatus: (ma: string) => void;
  handleUpdate: (ma: string, updatedTopic: AddOrUpdateTopicType) => void;
};

export type ArticleFilterType = {
  title_and_author_name: string;
  assigned_name_and_assigned_id: string;
  topic_name: string;
  status: string;
  campaign_period: string;
};

export type ListArticlesType = {
  article_id: string;
  title: string;
  author_name: string;
  topic_name: string;
  campaign_period: string;
  status: string;
  assignment: string;
  assignee_id: string;
  assignee_name: string;
  created_at: string;
};

export type PRListArticlesContextType = {
  data: ListArticlesType[] | undefined;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
  tooltips: {
    content: string;
    icon: LucideIcon;
    type: string;
    className: string;
  }[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  valueFilter: ArticleFilterType;
  setValueFilter: Dispatch<SetStateAction<ArticleFilterType>>;
};

export type PRStaffsType = {
  title: string;
  topic_name: string;
  author_name: string;
  created_at: string;
  status: string;
  article_id: string;
};

export type PRStaffsFilterType = {
  title_and_author_name: string;
  topic_name: string;
};

export type PRStaffsContextType = {
  data: PRStaffsType[] | undefined;
  setData: Dispatch<SetStateAction<PRStaffsType[] | undefined>>;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  valueFilter: PRStaffsFilterType;
  setValueFilter: Dispatch<SetStateAction<PRStaffsFilterType>>;
};

export type StaffListArticleType = {
  title: string;
  author_name: string;
  topic_name: string;
  campaign_period: string;
  status: string;
  created_at: string;
  article_id: string;
};

export type StaffListArticleFilterType = {
  title_and_author_name: string;
  topic_name: string;
  status: string;
  campaign_period: string;
};

export type StaffListArticleContextType = {
  data: StaffListArticleType[] | undefined;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
  tooltips: {
    content: string;
    icon: LucideIcon;
    type: string;
    className: string;
  }[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  valueFilter: StaffListArticleFilterType;
  setValueFilter: Dispatch<SetStateAction<StaffListArticleFilterType>>;
};

export type AdminRegistrationPeriodType = {
  id: string;
  name: string;
  time: string;
  time_registration: string;
  campaign_period: number;
  status: string;
};

export type AdminRegistrationPeriodFilterType = {
  id_or_name: string;
  start_date: string;
  status: string;
  end_date: string;
};

export type AdminRegistrationPeriodContextType = {
  data: AdminRegistrationPeriodType[] | undefined;
  setData: Dispatch<SetStateAction<AdminRegistrationPeriodType[] | undefined>>;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
  tooltips: {
    content: string;
    icon: LucideIcon;
    type: string;
    className: string;
  }[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  valueFilter: AdminRegistrationPeriodFilterType;
  setValueFilter: Dispatch<SetStateAction<AdminRegistrationPeriodFilterType>>;
};
