import {
  MutableRefObject,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from 'react';
import {
  AiFillEdit,
  AiFillRightCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import '../Updatables.css';
import { useFirestore } from '../../../hooks/useFirestore';

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
  const [textLength, setTextLength] = useState(displayValue.length);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    if (!edit) return;
    if (role === 'heading') {
      inputRef.current.focus();
    } else {
      textAreaRef.current.focus();
    }
  }, [edit, role]);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const currentTextLength = e.target.value.length;
    if (currentTextLength >= maxLength) return;
    setText(e.target.value);
    setTextLength(currentTextLength);
  };

  const handleCancelChange = () => {
    setText(displayValue);
    setEdit(false);
  };

  const handleUpdateClick = async () => {
    if (text.length <= 1) return;
    try {
      await updateDocument(collectionName, docId, { [property]: text });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Updatables">
      {edit ? (
        <div>
          {role === 'heading' && (
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              ref={inputRef}
            />
          )}
          {role === 'paragraph' && (
            <textarea
              value={text}
              onChange={handleTextChange}
              ref={textAreaRef}
            />
          )}
          <button onClick={handleCancelChange}>
            <AiFillCloseCircle size={15} />
          </button>
          <button onClick={handleUpdateClick}>
            <AiFillRightCircle size={15} />
          </button>
          <span>
            {textLength}/{maxLength}
          </span>
        </div>
      ) : (
        <div className={`Updatables__display Updatables__display--${role}`}>
          {displayValue}
        </div>
      )}

      {!edit && (
        <button className="Updatables__btn--edit" onClick={() => setEdit(true)}>
          <AiFillEdit size={15} />
        </button>
      )}
    </div>
  );
};

export default UpdatableTextValue;
