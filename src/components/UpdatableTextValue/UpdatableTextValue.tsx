import { MutableRefObject, useEffect, useState, useRef } from 'react';
import {
  AiFillEdit,
  AiFillRightCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import './UpdatableTextValue.css';
import { useFirestore } from '../../hooks/useFirestore';

type RoleType = 'heading' | 'paragraph';

type PropsType = {
  displayValue: string;
  role: RoleType;
  maxLength: number;
  collectionName: string;
  docId: string;
  property: string;
};

const UpdatableTextValue = ({
  displayValue,
  role,
  maxLength,
  collectionName,
  docId,
  property,
}: PropsType) => {
  const { updateDocument } = useFirestore();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(displayValue);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!edit) return;
    inputRef.current.focus();
  }, [edit]);

  const handleCancelChange = () => {
    setText(displayValue);
    setEdit(false);
  };

  const handleUpdateClick = async () => {
    try {
      await updateDocument(collectionName, docId, { [property]: text });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UpdatableTextValue">
      {edit ? (
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          />
          <button onClick={handleCancelChange}>
            <AiFillCloseCircle size={15} />
          </button>
          <button onClick={handleUpdateClick}>
            <AiFillRightCircle size={15} />
          </button>
        </div>
      ) : (
        <p>{displayValue}</p>
      )}

      {!edit && (
        <button
          className="UpdatableTextValue__btn--edit"
          onClick={() => setEdit(true)}
        >
          <AiFillEdit size={15} />
        </button>
      )}
    </div>
  );
};

export default UpdatableTextValue;
