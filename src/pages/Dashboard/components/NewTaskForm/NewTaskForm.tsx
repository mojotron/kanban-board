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

type PropsType = {
  onClose: () => void;
};

const NewTaskForm = ({ onClose }: PropsType) => {
  const { createNewTask, firestorePending, firestoreError } = useProject();
  const titleInputRef = useRef() as MutableRefObject<HTMLInputElement>;

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

  const handleCloseModal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
  }, []);

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
        <p className={`Form__note ${firestoreError ? 'error' : ''}`}>
          {firestoreError
            ? `${firestoreError}`
            : 'You can update all fields later in your dashboard!'}
        </p>
      </form>
    </div>
  );
};

export default NewTaskForm;
