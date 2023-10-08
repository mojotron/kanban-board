import { useState } from 'react';
import UpdateControls from '../components/UpdateControls';
import UpdateInput from './UpdateInput';
import OuterLink from '../../../components/OuterLink/OuterLink';
import UpdateButton from '../components/UpdateButton';

type LinkConfig = {
  to: string;
  label: boolean;
  labelText: string;
};

type PropsType = {
  text: string;
  updatable?: boolean; // for admin only
  className?: string;
  maxLength?: number;
  type?: 'input' | 'textarea';
  link?: undefined | LinkConfig; // update link
  onUpdate: (value: string) => void;
};
// make text element updatable (one line, paragraph or link)
const UpdateText = ({
  text,
  updatable = true,
  className = '',
  type = 'input',
  maxLength = 100,
  link = undefined,
  onUpdate,
}: PropsType) => {
  const [textValue, setTextValue] = useState(() => (link ? link.to : text));
  const [update, setUpdate] = useState(false);

  if (update)
    return (
      <div style={{ display: 'flex' }}>
        <UpdateInput
          value={textValue}
          onChange={setTextValue}
          type={type}
          maxLength={maxLength}
        />

        <UpdateControls
          config={[
            {
              type: 'close',
              onClick: () => {
                setUpdate(false);
                setTextValue(text);
              },
            },
            {
              type: 'submit',
              onClick: () => {
                onUpdate(textValue);
                setUpdate(false);
              },
            },
          ]}
        />
      </div>
    );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {type === 'input' && !link && <h3 className={`${className}`}>{text}</h3>}
      {type === 'textarea' && !link && <p className={`${className}`}>{text}</p>}
      {link && (
        <OuterLink to={link.to}>
          {link.label ? link.labelText : link.to}
        </OuterLink>
      )}

      {updatable && <UpdateButton onClick={setUpdate} />}
    </div>
  );
};

export default UpdateText;
