import DialogCustom from '@/components/DialogCustom';
import FieldsSelect from '@/components/FieldsSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTheme from '@/hooks/useTheme';
import useViewport from '@/hooks/useViewport';
import { handleMutationError } from '@/utils/handleMutationError';
import { httpRequest } from '@/utils/httpRequest';
import { useMutation, useQuery } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { List } from 'lucide-react';
import mammoth from 'mammoth';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface WritingCampaign {
  id: string;
  name: string;
}

interface TopicData {
  camPaignRegistrationId: string;
  topicId: string;
  topicName: string;
}

const Example = ({
  writingCampaign,
  selectedA,
  selectedB,
  setSelectedA,
  setSelectedB,
  dataB,
  title,
  setTitle,
}: {
  writingCampaign: WritingCampaign[];
  setSelectedA: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
  setSelectedB: Dispatch<SetStateAction<string>>;
  selectedA: string;
  selectedB: string;
  dataB: { label: string; value: string; key?: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tiêu đề bài viết:
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Label htmlFor="campaign_period" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="campaign_period"
          data={writingCampaign.map((item) => ({ label: item.name, value: item.id }))}
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
    </div>
  );
};

interface CreateDataValue {
  title: string;
  content: string;
  campaignRegistrationId: string;
  status: string;
}

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
  const [selectedA, setSelectedA] = useState('');
  const [selectedB, setSelectedB] = useState('');
  const [title, setTitle] = useState('');

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
      toast.error('Chỉ hỗ trợ file .docx. Vui lòng chuyển file .doc sang .docx');
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

  const { data: writingCampaign = [] } = useQuery<WritingCampaign[]>({
    queryKey: ['writingCampaign'],
    queryFn: async () => {
      const res = await httpRequest.get('/dot-bai-viet/danh-sach-dot-bai-viet');
      return res.data;
    },
  });

  const { data: topicData = [] } = useQuery<TopicData[]>({
    queryKey: ['topics', selectedA],
    queryFn: async () => {
      if (!selectedA) return [];
      const res = await httpRequest.get(`/chu-de/chu-de-theo-dot/${selectedA}`);
      return res.data;
    },
    enabled: !!selectedA,
  });

  const dataB =
    topicData.length > 0
      ? Array.from(new Map(topicData.map((td) => [td.camPaignRegistrationId, td])).values()).map((td) => ({
          label: td.topicName,
          value: td.camPaignRegistrationId,
          key: td.topicId,
        }))
      : [];

  const createMutation = useMutation({
    mutationKey: ['create-article'],
    mutationFn: async (data: CreateDataValue) => await httpRequest.post('/admin/bai-viet/tao-bai-viet', data),
    onSuccess: () => {
      toast.success('Tạo bài viết thành công');
      setMarkdown('');
      setTitle('');
      setSelectedA('');
      setSelectedB('');
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });

  const handleCreateArticle = useCallback(() => {
    if (!selectedA || !selectedB || !title) {
      toast.error('Vui lòng chọn, nhập đủ trường');
      return;
    }
    const data: CreateDataValue = {
      title,
      content: markdown,
      campaignRegistrationId: selectedB,
      status: 'Pending',
    };

    createMutation.mutate(data);
  }, [selectedA, selectedB, title, markdown, createMutation]);

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
            onContinue={handleCreateArticle}
            title="Đăng bài viết"
            triggerComponent={
              <Button customize={'default'} disabled={markdown.trim().length < 20}>
                Đăng bài
              </Button>
            }
            component={
              <Example
                dataB={dataB}
                selectedA={selectedA}
                selectedB={selectedB}
                setSelectedA={setSelectedA}
                setSelectedB={setSelectedB}
                writingCampaign={writingCampaign}
                title={title}
                setTitle={setTitle}
              />
            }
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
        textareaProps={{ placeholder: `Nhập nội dung vào đây` }}
        previewOptions={{ disallowedElements: ['style'] }}
      />
    </div>
  );
};

export default UserCreateArticle;
