import DialogCustom from '@/components/DialogCustom';
import FieldsSelect from '@/components/FieldsSelect';
import UploadImage from '@/components/UploadImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTheme from '@/hooks/useTheme';
import useViewport from '@/hooks/useViewport';
import { useQuery } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { List } from 'lucide-react';
import mammoth from 'mammoth';
import { useEffect, useRef, useState } from 'react';

const Example = () => {
  // dependent select
  const [selectedA, setSelectedA] = useState('');
  const [selectedB, setSelectedB] = useState('');

  const dataA = [
    { label: 'Fruits', value: 'fruits' },
    { label: 'Vehicles', value: 'vehicles' },
  ];

  const optionsMap: Record<string, { label: string; value: string }[]> = {
    fruits: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    vehicles: [
      { label: 'Car', value: 'car' },
      { label: 'Bike', value: 'bike' },
    ],
  };

  const dataB = selectedA ? optionsMap[selectedA] || [] : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tiêu đề bài viết:
        </Label>
        <Input id="title" type="text" placeholder="Tiêu đề bài viết" value={''} onChange={() => console.log(1)} />
      </div>
      <div className="flex flex-col justify-end">
        <Label htmlFor="campaign_period" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="campaign_period"
          data={dataA}
          placeholder="Chọn đợt viết bài"
          label="Đợt viết bài"
          value={selectedA}
          setValue={(val) => {
            setSelectedA(val);
            setSelectedB('');
          }}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Label htmlFor="topic" className="font-bold mb-2 leading-5">
          Chủ đề:
        </Label>
        <FieldsSelect
          id="topic"
          data={dataB}
          placeholder="Chọn chủ đề"
          label="Chủ đề"
          value={selectedB}
          setValue={setSelectedB}
          resetValue={!selectedA}
        />
      </div>
      <UploadImage />
    </div>
  );
};

const UserCreateArticle = () => {
  const { height } = useViewport();
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      alert('Chỉ hỗ trợ file .docx. Vui lòng chuyển file .doc sang .docx');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer });
          setMarkdown(result.value);
        } catch (err) {
          console.error('Lỗi khi đọc file:', err);
          alert('Không thể đọc nội dung file .docx');
        }
      }
    };
    reader.readAsArrayBuffer(file);
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
          <input type="file" accept=".docx" onChange={handleFileChange} ref={inputRef} className="hidden" />
          <Button variant={'outline'} onClick={() => inputRef.current?.click()}>
            Tải bài lên
          </Button>
          <DialogCustom
            onContinue={() => console.log(1)}
            title="Đăng bài viết"
            triggerComponent={
              <Button customize={'default'} disabled={markdown.trim().length < 20}>
                Đăng bài
              </Button>
            }
            component={<Example />}
          />
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
