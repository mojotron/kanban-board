import { useState } from 'react';
import { CgMore } from 'react-icons/cg';

type Props = {
  text: string;
  length: number;
  className: string;
};

const TextBox = ({ text, length, className }: Props) => {
  const hide = text.length > length - 3;
  const short = text.slice(0, length);

  return (
    <>
      <p className={className}>
        <span>{hide ? short.trimEnd() : text}</span>

        {hide && (
          <span style={{ position: 'relative', top: '0.5rem' }}>
            <CgMore size={15} />
          </span>
        )}
      </p>
    </>
  );
};

export default TextBox;
