import { useState } from 'react';

type PropsType = {
  text: string;
  hideWordsLength: number;
  hideText?: string;
  expandText?: string;
  expanded?: boolean;
  className: string;
};

const ExpandedText = ({
  text,
  hideWordsLength,
  expanded = false,
  expandText = 'Show More',
  hideText = 'Show Less',
  className = '',
}: PropsType) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const words = text.split(' ');
  const hide = words.length < hideWordsLength;

  const lessText = `${words.slice(0, hideWordsLength).join(' ')}...`;

  const displayText = isExpanded
    ? text
    : `${words.slice(0, hideWordsLength).join(' ')}...`;

  if (hide) return <div>{text}</div>;

  return (
    <div className={className}>
      {displayText}

      <button onClick={() => setIsExpanded((oldValue) => !oldValue)}>
        {isExpanded ? hideText : expandText}
      </button>
    </div>
  );
};

export default ExpandedText;
