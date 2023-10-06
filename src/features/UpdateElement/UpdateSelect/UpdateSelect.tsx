import { useState } from 'react';
import UpdateButton from '../components/UpdateButton';
import styles from './UpdateSelect.module.css';
import UpdateControls from '../components/UpdateControls';

type PropsType = {
  options: string[];
  currentOption: string;
  updatable?: boolean;
  onUpdate: () => void;
};

const UpdateSelect = ({
  currentOption,
  options,
  updatable = true,
}: PropsType) => {
  const [selectedValue, setSelectedValue] = useState(currentOption);
  const [edit, setEdit] = useState(false);

  if (edit)
    return (
      <div>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {options.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <UpdateControls
          config={[
            { type: 'close', onClick: () => setEdit(false) },
            {
              type: 'submit',
              onClick: () => {
                // TODO
                setEdit(false);
              },
            },
          ]}
        />
      </div>
    );

  return (
    <div className={styles.update}>
      <p>{currentOption}</p>
      {updatable && <UpdateButton onClick={() => setEdit(true)} />}
    </div>
  );
};

export default UpdateSelect;
