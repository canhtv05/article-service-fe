import { LucideIcon } from 'lucide-react';
import type { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react';

export type LayoutComponent = ComponentType<{ children: ReactNode }>;

export type RouteComponent = ComponentType<unknown>;

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
  fill: string;
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
  valueSelect: string | undefined;
  from: number | undefined;
  to: number | undefined;
};

export type AddTopicType = {
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
  }[];
  valueFilter: TopicFilterType;
  setValueFilter: Dispatch<SetStateAction<TopicFilterType>>;
  perPage: string;
  setPerPage: Dispatch<SetStateAction<string>>;
  handleClearFields: VoidFunction;
  handleFilters: VoidFunction;
  dataAdd: AddTopicType;
  setDataAdd: Dispatch<SetStateAction<AddTopicType>>;
  handleAdd: VoidFunction;
};
