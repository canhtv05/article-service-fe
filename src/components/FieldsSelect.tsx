import { ChevronDown } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FieldsSelectType } from '@/types';

const FieldsSelect = ({
  data,
  placeholder,
  label,
  id,
}: {
  data: FieldsSelectType[];
  placeholder: string;
  label: string;
  id?: string;
}) => {
  return (
    <Select>
      <SelectPrimitive.Trigger
        className={cn(
          'flex h-9 cursor-pointer !w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          'w-44',
        )}
        id={id}
      >
        <SelectValue placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map((d, index) => (
            <SelectItem className="cursor-pointer" value={`${d.label} ${index}`} key={index}>
              {d.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FieldsSelect;
