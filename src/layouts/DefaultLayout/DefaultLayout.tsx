import type { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default DefaultLayout;
