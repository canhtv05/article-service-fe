import { Fragment } from 'react';

import {
  Status,
  StatusApproveArticle,
  StatusArchiveAndHistory,
  StatusArticle,
  StatusRegistration,
  StatusSend,
} from '@/enums';
import RenderIf from './RenderIf';
import { Badge } from './ui/badge';

const StatusBadge = ({ status }: { status: Status | string }) => {
  const s = status.charAt(0).toUpperCase() + status.substring(1).toLowerCase() || '';

  return (
    <Fragment>
      <RenderIf value={status === Status.PENDING}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === Status.INACTIVE}>
        <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === Status.ACTIVE}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusSend.NOT_SENT}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {StatusSend.NOT_SENT}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusRegistration.OPEN}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {StatusRegistration.OPEN}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusRegistration.CLOSE}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {StatusRegistration.CLOSE}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusApproveArticle.PENDING}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArchiveAndHistory.APPROVED}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArchiveAndHistory.NOT_APPROVED}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.POSTED}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.PENDING}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.NOT_POSTED}>
        <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.INACTIVE}>
        <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.APPROVED}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusArticle.SendToPR}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          Gửi cho PR
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusRegistration.NOT_OPEN}>
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
      <RenderIf value={status === StatusRegistration._OPEN}>
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          {s}
        </Badge>
      </RenderIf>
    </Fragment>
  );
};

export default StatusBadge;
