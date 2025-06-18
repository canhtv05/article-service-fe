/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Gender } from '@/enums';
import { LucideIcon } from 'lucide-react';
import type { ComponentType, Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

/* API RESPONSE */
export interface TokenInfo {
  accessToken: string;
  accessTokenTTL: number;
  refreshToken: string;
  refreshTokenTTL: number;
}

export interface AbstractEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  meta?: {
    tokenInfo?: TokenInfo;
  };
}

/* ENTITY RESPONSE */
export interface UserResponse extends AbstractEntity {
  fullName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export type LayoutComponent = ComponentType<{ children: ReactNode }>;

export type RouteComponent = ComponentType<{}>;

export type DialogLinkProps = {
  children: React.ReactNode;
  title: string;
  outline?: boolean;
  open: boolean;
  component?: ReactElement;
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
  id: string;
  name: string;
  royaltyFee: number;
  description: string;
  status: string;
};

export type TopicResponseType = {
  content: TopicType[];
  totalPages: number;
  totalElements: number;
};

export type TopicFilterType = {
  name: string;
  status: string;
  minFee: number | undefined;
  maxFee: number | undefined;
};

export type AddOrUpdateTopicType = {
  name: string;
  royaltyFee: number | undefined;
  description: string;
};

export type TopicContextType = {
  data: TopicResponseType | undefined;
  setData: Dispatch<SetStateAction<TopicResponseType | undefined>>;
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
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export type ArticleFilterType = {
  titleAndAuthorName: string;
  writingCampaignId: string;
  assignerName: string;
  status: string;
  topicId: string;
};

export type ListArticlesType = {
  id: string;
  title: string;
  authorName: string;
  topic: string;
  campaignName: string;
  status: string;
  assignee_name: string;
  createdAt: string;
  campaignRegistration: {
    topic: {
      id: string;
    };
  };
};

export type ListArticlesResponseType = {
  content: ListArticlesType[];
  totalPages: number;
  totalElements: number;
};

export type PRListArticlesContextType = {
  data: ListArticlesResponseType | undefined;
  setData: Dispatch<SetStateAction<ListArticlesResponseType | undefined>>;
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
  id: string;
  title: string;
  topic: string;
  authorName: string;
  createdAt: string;
  status: string;
};

export type PRStaffsFilterType = {
  titleAndAuthorName: string;
  topicId: string;
};

export type PRStaffsContextType = {
  data: PRStaffsType[] | undefined;
  setData: Dispatch<SetStateAction<PRStaffsType[] | undefined>>;
  isLoading: boolean;
  error: unknown;
  titlesTable: string[];
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
  description: string;
  startDate: string;
  endDate: string;
  writingStartDate: string;
  writingEndDate: string;
  status: string;
  createAt: string;
  updateAt: string;
};

export type AdminRegistrationPeriodResponseType = {
  content: AdminRegistrationPeriodType[];
  totalPages: number;
  totalElements: number;
};

export type AdminRegistrationPeriodFilterType = {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
};

export type AdminRegistrationPeriodContextType = {
  data: AdminRegistrationPeriodResponseType | undefined;
  setData: Dispatch<SetStateAction<AdminRegistrationPeriodResponseType | undefined>>;
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

export type AdminRegistrationDetailType = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  writingStartDate: string;
  writingEndDate: string;
  status: string;
};

export type AdminRegistrationDetailChildType = {
  subCampaignId: string;
  subCampaignName: string;
  startDate: string;
  endDate: string;
  assignedArticleCount: number;
  assignedLecturerCount: number;
};

export type AdminRegistrationDetailChildTResponseType = {
  content: AdminRegistrationDetailChildType[];
  totalPages: number;
  totalElements: number;
};

export type AdminRegistrationDetailContextType = {
  dataDetail: AdminRegistrationDetailType | undefined;
  setDataDetail: Dispatch<SetStateAction<AdminRegistrationDetailType | undefined>>;
  dataChild: AdminRegistrationDetailChildTResponseType | undefined;
  setDataChild: Dispatch<SetStateAction<AdminRegistrationDetailChildTResponseType | undefined>>;
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
};

export type AdminRegistrationChildType = {
  id: string;
  authorName: string;
  topicName: string;
  assignedArticleCount: number;
};

export type AdminRegistrationChildContextType = {
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
};

export type AddUserToCampaignType = {
  id: string;
  authorName: string;
  topicName: string;
  assignedArticleCount: number;
  subCampaignId: string;
  userid: string;
};

export type AdminApproveArticleType = {
  id: string;
  title: string;
  authorName: string;
  campaignName: string;
  topic: string;
  submittedAt: string;
  approvedAt: string;
  status: string;
  campaignId: string;
  subCampaignId: string;
  createdAt: string;
  updatedAt: string;
  campaign: {
    startDate: string;
    endDate: string;
  };
};

export type AdminApproveArticleResponseType = {
  content: AdminApproveArticleType[];
  totalPages: number;
};

export type AdminApproveArticleFilterType = {
  titleAndAuthorName: string;
  campaignName: string;
  startDate: string;
  endDate: string;
};

export type AdminApproveArticleContextType = {
  data: AdminApproveArticleResponseType | undefined;
  setData: Dispatch<SetStateAction<AdminApproveArticleResponseType | undefined>>;
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
  valueFilter: AdminApproveArticleFilterType;
  setValueFilter: Dispatch<SetStateAction<AdminApproveArticleFilterType>>;
};

export type AdminArchiveType = {
  id: string;
  title: string;
  topic: string;
  authorName: string;
  status: string;
  campaignRegistration: {
    topic: {
      royaltyFee: number;
    };
  };
  campaignName: string;
  impactDate: string;
};

export type AdminArchiveResponseType = {
  content: AdminArchiveType[];
  totalPages: number;
  totalElements: number;
};

export type AdminArchiveFilterType = {
  title: string;
  authorName: string;
  campaignName: string;
  status: string;
};

export type AdminArchiveContextType = {
  data: AdminArchiveResponseType | undefined;
  setData: Dispatch<SetStateAction<AdminArchiveResponseType | undefined>>;
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
  valueFilter: AdminArchiveFilterType;
  setValueFilter: Dispatch<SetStateAction<AdminArchiveFilterType>>;
};

export type AdminApprovalHistoryType = {
  id: string;
  title: string;
  authorName: string;
  campaignName: string;
  topic: string;
  submittedAt: string;
  approvedAt: string;
  status: string;
  campaignId: string;
  subCampaignId: string;
  createdAt: string;
  updatedAt: string;
  impactDate: string;
  campaign: {
    startDate: string;
    endDate: string;
  };
};

export type AdminApproveHistoryResponseType = {
  content: AdminApprovalHistoryType[];
  totalPages: number;
};

export type AdminApprovalHistoryFilterType = {
  title: string;
  status: string;
  startDate: string;
  endDate: string;
};

export type AdminApprovalHistoryContextType = {
  data: AdminApproveHistoryResponseType | undefined;
  setData: Dispatch<SetStateAction<AdminApproveHistoryResponseType | undefined>>;
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
  valueFilter: AdminApprovalHistoryFilterType;
  setValueFilter: Dispatch<SetStateAction<AdminApprovalHistoryFilterType>>;
};

export type UserRegisterWriteType = {
  id: string;
  campaignName: string;
  countTopicId: string;
  startDate: string;
  endDate: string;
  status: string;
};

export type UserRegisterWriteFilterType = {
  campaignName: string;
  startDate: string;
  endDate: string;
};

export type UserRegisterWriteResponseType = {
  content: UserRegisterWriteType[];
  totalPages: number;
  totalElements: number;
};

export type UserRegisterWriteContextType = {
  data: UserRegisterWriteResponseType | undefined;
  setData: Dispatch<SetStateAction<UserRegisterWriteResponseType | undefined>>;
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
  valueFilter: UserRegisterWriteFilterType;
  setValueFilter: Dispatch<SetStateAction<UserRegisterWriteFilterType>>;
};

export type UserListArticlesType = {
  id: string;
  title: string;
  topic: string;
  created_at: number;
  campaign_period: string;
  status: string;
};

export type UserListArticlesFilterType = Pick<
  UserListArticlesType,
  'title' | 'topic' | 'campaign_period' | 'status'
> & {
  start_date: string;
  end_date: string;
};

export type UserListArticlesContextType = {
  data: UserListArticlesType[] | undefined;
  setData: Dispatch<SetStateAction<UserListArticlesType[] | undefined>>;
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
  valueFilter: UserListArticlesFilterType;
  setValueFilter: Dispatch<SetStateAction<UserListArticlesFilterType>>;
};
