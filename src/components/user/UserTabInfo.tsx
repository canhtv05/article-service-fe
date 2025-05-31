import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import UserListStatistics from './UserListStatistics';
import UserCurrentCampaignPeriod from './UserCurrentCampaignPeriod';
import UserTopArticles from './UserTopArticles';

const items: { title: string; content: React.FC }[] = [
  {
    title: 'Danh sách thống kê',
    content: UserListStatistics,
  },
  {
    title: 'Đợt viết bài hiện tại',
    content: UserCurrentCampaignPeriod,
  },
  {
    title: 'TOP 5 bài viết được yêu thích',
    content: UserTopArticles,
  },
];

const UserTabInfo = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 p-2">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <item.content />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserTabInfo;
