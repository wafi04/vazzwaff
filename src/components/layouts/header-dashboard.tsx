import { ReactNode } from "react";

interface HeaderSectionProps {
    title: string
    subTitle?: string
    children? : ReactNode
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({title,subTitle,children}) => (
  <div className="flex flex-row justify-between items-center w-full">
    <h1 className="text-2xl font-bold text-card-foreground">Sub Category</h1>
    <p className="text-md"></p>
   {children}
  </div>
);
