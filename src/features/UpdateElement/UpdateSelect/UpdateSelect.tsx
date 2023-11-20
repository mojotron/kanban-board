import { useState } from 'react';
import UpdateButton from '../components/UpdateButton';
import styles from '../styles/UpdateElement.module.css';
import UpdateControls from '../components/UpdateControls';

type PropsType = {
  options: string[];
  currentOption: string;
  updatable?: boolean;
  onUpdate: (value: string) => void;
};

const UpdateSelect = ({
  currentOption,
  options,
  onUpdate,
  updatable = true,
}: PropsType) => {
  const [selectedValue, setSelectedValue] = useState(currentOption);
  const [edit, setEdit] = useState(false);

  if (edit)
    return (
      <div className={styles.mainContainer}>
        <div className={styles.inputContainer}>
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className={styles.input}
          >
            {options.map((ele) => (
              <option key={ele} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>

        <UpdateControls
          config={[
            {
              type: 'close',
              onClick: () => {
                setEdit(false);
                setSelectedValue(currentOption);
              },
            },
            {
              type: 'submit',
              onClick: () => {
                onUpdate(selectedValue);
                setEdit(false);
              },
            },
          ]}
        />
      </div>
    );

  return (
    <div className={styles.mainContainer}>
      <p>{currentOption}</p>
      {updatable && <UpdateButton onClick={() => setEdit(true)} />}
    </div>
  );
};

export default UpdateSelect;
