import { useState } from 'react';
import styles from './UpdateText.module.css';
import { AiFillEdit as IconEdit } from 'react-icons/ai';
import UpdateControls from './UpdateControls';
import UpdateInput from './UpdateInput';
import OuterLink from '../OuterLink/OuterLink';

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
};
// make text element updatable (one line, paragraph or link)
const UpdateText = ({
  text,
  updatable = true,
  className = '',
  type = 'input',
  maxLength = 100,
  link = undefined,
}: PropsType) => {
  const [textValue, setTextValue] = useState(() => (link ? link.to : text));
  const [update, setUpdate] = useState(false);

  if (update)
    return (
      <div>
        <UpdateInput
          value={textValue}
          onChange={setTextValue}
          type={type}
          maxLength={maxLength}
        />

        <UpdateControls onClose={() => setUpdate(false)} onSubmit={() => {}} />
      </div>
    );

  return (
    <div className={styles.update}>
      {type === 'input' && !link && <h3 className={`${className}`}>{text}</h3>}
      {type === 'textarea' && !link && <p className={`${className}`}>{text}</p>}
      {link && (
        <OuterLink to={link.to}>
          {link.label ? link.labelText : link.to}
        </OuterLink>
      )}

      {updatable && (
        <button className={styles.updateBtn} onClick={() => setUpdate(true)}>
          <IconEdit size={18} />
        </button>
      )}
    </div>
  );
};

export default UpdateText;
