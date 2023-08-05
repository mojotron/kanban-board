import { useState } from 'react';
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiFillRightCircle,
} from 'react-icons/ai';
import '../Updatables.css';
import { useFirestore } from '../../../hooks/useFirestore';

type PropsType = {
  displayValue: string;
  options: string[];
  collectionName: string;
  docId: string;
  property: string;
};

const UpdatableSelectValue = ({
  displayValue,
  options,
  collectionName,
  docId,
  property,
}: PropsType) => {
  const { updateDocument } = useFirestore();
  const [edit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(displayValue);

  const handleCancelChange = () => {
    setSelectedValue(displayValue);
    setEdit(false);
  };

  const handleUpdateClick = async () => {
    try {
      await updateDocument(collectionName, docId, {
        [property]: selectedValue,
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
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
          <button onClick={handleUpdateClick}>
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
