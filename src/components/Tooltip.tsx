import { ReactNode } from 'react';

import { Tooltip as ToolTipHover, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const Tooltip = ({ toolTipTrigger, toolTipContent }: { toolTipTrigger: ReactNode; toolTipContent: ReactNode }) => {
  return (
    <TooltipProvider>
      <ToolTipHover>
        <TooltipTrigger asChild>{toolTipTrigger}</TooltipTrigger>
        <TooltipContent>{toolTipContent}</TooltipContent>
      </ToolTipHover>
    </TooltipProvider>
  );
};

export default Tooltip;
