import { Button } from '@/components/ui/button';
import useTheme from '@/hooks/useTheme';
import useViewport from '@/hooks/useViewport';
import { useQuery } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { List } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserCreateArticle = () => {
  const { height } = useViewport();
  const { theme } = useTheme();

  const { data } = useQuery({
    queryKey: ['markdown'],
    queryFn: async () => {
      const response = await axios.get('/markdown.md');
      return response.data;
    },
  });

  const [markdown, setMarkdown] = useState<string>(data || '');

  useEffect(() => {
    if (data) {
      setMarkdown(data);
    }
  }, [data]);

  const handleChange = (value: string | undefined) => {
    setMarkdown(value as string);
  };

  return (
    <div className="h-full">
      <div className="flex gap-3 items-center justify-between my-2">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Tạo bài viết</span>
        </div>
      </div>
      <div className="flex my-5 items-center">
        <span className="text-foreground/30 text-sm">Ký tự: {markdown.trim().length}</span>
        <div className="flex gap-2 flex-1 justify-end">
          <Button variant={'outline'}>Tải bài lên</Button>
          <Button customize={'default'} disabled={markdown.trim().length < 20}>
            Đăng bài
          </Button>
        </div>
      </div>
      <MDEditor
        data-color-mode={`${theme === 'dark' ? 'dark' : 'light'}`}
        id="pitch"
        preview="edit"
        className="startup-form_input"
        height={height - 220}
        style={{ overflow: 'hidden', borderRadius: 8, background: 'var(--background)' }}
        value={markdown}
        onChange={(value) => handleChange(value)}
        textareaProps={{
          placeholder: `Nhập nội dung vào đây`,
        }}
        previewOptions={{
          disallowedElements: ['style'],
        }}
      />
    </div>
  );
};

export default UserCreateArticle;
