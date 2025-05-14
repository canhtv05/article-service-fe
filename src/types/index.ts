import type { ComponentType, ReactNode } from "react";

export type LayoutComponent = ComponentType<{ children: ReactNode }>;

export type RouteComponent = ComponentType<unknown>;

export type RouteType = {
  path: string;
  component: RouteComponent;
  layout?: null | LayoutComponent;
  children?: {
    path: string;
    component: RouteComponent;
  }[];
};
