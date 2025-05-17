import cn from 'clsx';

import { StatisticalItemType } from '@/types';
import useViewport from '@/hooks/useViewport';

const Statistical = ({ statistical }: { statistical: StatisticalItemType }) => {
  const { width } = useViewport();
  const checkLength = statistical.children.length;

  if (!statistical) return null;

  const columnClass = cn({
    'md:grid-cols-1': checkLength === 1,
    'md:grid-cols-2': checkLength === 2,
    'md:grid-cols-3': checkLength === 3,
    'md:grid-cols-4': checkLength === 4,
    'md:grid-cols-5': checkLength === 5,
  });

  return (
    <ul className={`grid auto-rows-min gap-4 ${columnClass} cursor-pointer`}>
      {statistical.children.map((statistical) => (
        <li
          key={statistical.label}
          className="rounded-xl border bg-muted/50 h-[130px] py-6 shadow hover:shadow-lg transition-all duration-200"
        >
          <div className="p-2 text-[16px] font-bold md:text-[14px]">
            <span className="block text-center text-foreground">{statistical.label}</span>
            <div className={`${statistical.classText} flex items-center justify-center gap-2 pt-3`}>
              <statistical.icon className={`${width <= 917 ? 'size-5' : 'size-7'}`} />
              <span className={`${width <= 917 ? 'text-[16px]' : 'text-[20px]'}`}>{statistical.count} bài</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Statistical;
