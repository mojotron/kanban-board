import { useState } from 'react';
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiFillRightCircle,
} from 'react-icons/ai';
import '../Updatables.css';

type PropsType = {
  displayValue: string;
  options: string[];
  handleUpdate: <T>(value: T) => void;
};

const UpdatableSelectValue = ({
  displayValue,
  options,
  handleUpdate,
}: PropsType) => {
  const [edit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(displayValue);

  const handleCancelChange = () => {
    setSelectedValue(displayValue);
    setEdit(false);
  };

  return (
    <div className="Updatables">
      {edit ? (
        <div>
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {options.map((o, i) => (
              <option key={i} value={o}>
                {o}
              </option>
            ))}
          </select>
          <button onClick={handleCancelChange}>
            <AiFillCloseCircle size={15} />
          </button>
          <button
            onClick={() => {
              handleUpdate(selectedValue);
              setEdit(false);
            }}
          >
            <AiFillRightCircle size={15} />
          </button>
        </div>
      ) : (
        <div>{displayValue}</div>
      )}
      {!edit && (
        <button className="Updatables__btn--edit" onClick={() => setEdit(true)}>
          <AiFillEdit size={15} />
        </button>
      )}
    </div>
  );
};

export default UpdatableSelectValue;
