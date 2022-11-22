import { ReactNode } from "react";

interface Props {
  children: ReactNode,
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-10">
      {children}
    </div>
  );
};
