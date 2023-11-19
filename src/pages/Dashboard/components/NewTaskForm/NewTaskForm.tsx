import {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  FormEvent,
} from 'react';
import ModalCloseBtn from '../../../../components/ModalCloseBtn/ModalCloseBtn';
import { AddNewTaskType, Priority } from '../../../../types/taskType';
import { useProject } from '../../../../context/ProjectContext';
import { useCloseOnEscape } from '../../../../hooks/useCloseOnEscape';
// constants
import { NOTE_NEW_PROJECT } from '../../../../constants/displayTexts';

type PropsType = {
  onClose: () => void;
};

const NewTaskForm = ({ onClose }: PropsType) => {
  const { createNewTask, firestorePending, firestoreError } = useProject();
  const titleInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  useCloseOnEscape(onClose);

  type State = {
    title: string;
    description: string;
    priority: Priority;
    deadline: string;
  };

  type Action =
    | { type: 'CHANGE_TITLE'; payload: string }
    | { type: 'CHANGE_DESCRIPTION'; payload: string }
    | { type: 'CHANGE_PRIORITY'; payload: Priority }
    | { type: 'CHANGE_DEADLINE'; payload: string };

  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'CHANGE_TITLE':
          return { ...state, title: action.payload };
        case 'CHANGE_DESCRIPTION':
          return { ...state, description: action.payload };
        case 'CHANGE_PRIORITY':
          return { ...state, priority: action.payload };
        case 'CHANGE_DEADLINE':
          return { ...state, deadline: action.payload };
        default:
          return { ...state };
      }
    },
    {
      title: '',
      description: '',
      priority: 'low',
      deadline: '',
    }
  );

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: AddNewTaskType = {
      title: state.title,
      description: state.description,
      deadline: state.deadline,
      priority: state.priority,
    };
    await createNewTask(newTask);
    onClose();
  };

  return (
    <div className="overlay">
      <form className="Form" onSubmit={handleSubmit}>
        <ModalCloseBtn handleClose={onClose} />

        <h2 className="heading--secondary">New Task</h2>
        <div className="Form__item">
          <label htmlFor="new-task-title">Title</label>
          <input
            ref={titleInputRef}
            id="new-task-title"
            className="input"
            type="text"
            placeholder="short description"
            required
            maxLength={100}
            value={state.title}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_TITLE', payload: e.target.value })
            }
          />
        </div>

        <div className="Form__item">
          <label htmlFor="new-task-description">Task description</label>
          <textarea
            id="new-task-description"
            className="input--text-area"
            placeholder="write longer description what you expect to be done by task"
            required
            maxLength={2200}
            value={state.description}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value })
            }
          />
        </div>

        <div className="Form__item">
          <label htmlFor="new-task-priority">Priority</label>
          <select
            id="new-task-priority"
            className="input"
            value={state.priority}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_PRIORITY',
                payload: e.target.value as Priority,
              })
            }
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <div className="Form__item">
          <label htmlFor="new-task-deadline">Deadline</label>
          <input
            type="date"
            className="input"
            id="new-task-deadline"
            value={state.deadline}
            onChange={(e) => {
              dispatch({ type: 'CHANGE_DEADLINE', payload: e.target.value });
            }}
          />
        </div>

        <button type="submit" className="btn">
          {firestorePending ? 'Loading...' : 'Create'}
        </button>
        {firestoreError ? (
          <p className="note note--error">{firestoreError}</p>
        ) : (
          <p className="note">{NOTE_NEW_PROJECT}</p>
        )}
      </form>
    </div>
  );
};

export default NewTaskForm;
