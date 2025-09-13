import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; 
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ReadMoreProps {
  text: string;
  maxChars?: number;
  className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxChars = 140,className }) => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations()

  const toggle = () => setExpanded(!expanded);
  const isOverflow = text.length > maxChars;

  return (
    <div className={cn("text-gray-800 leading-6",className)}>
      {isOverflow ? (
        <>
          {expanded ? text : `${text.slice(0, maxChars)}...`}
          <button
            onClick={toggle}
            className="text-red-600 font-medium inline-flex items-center ml-2"
          >
            {expanded ? t('readless') : t('readmore')}
            {expanded ? (
              <ChevronUp className="ml-1 w-4 h-4" />
            ) : (
              <ChevronDown className="ml-1 w-4 h-4" />
            )}
          </button>
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default ReadMore;
