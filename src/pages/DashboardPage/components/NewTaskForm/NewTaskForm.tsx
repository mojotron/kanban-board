import { MutableRefObject, useEffect, useReducer, useRef } from 'react';
import { useKanbanStore } from '../../../../store';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Timestamp } from 'firebase/firestore';

const NewTaskForm = () => {
  const closeModal = useKanbanStore((state) => state.setOpenNewTaskModal);

  const titleInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  type Priority = 'low' | 'medium' | 'high';

  type State = {
    title: string;
    description: string;
    priority: Priority;
    deadline: undefined | string;
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
      deadline: undefined,
    }
  );

  console.log(state);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  return (
    <div className="overlay">
      <form className="Form" onSubmit={() => {}}>
        <button
          className="btn--icon"
          type="button"
          onClick={() => closeModal(false)}
        >
          <AiOutlineCloseCircle size={30} color="var(--COLOR-ACCENT-500)" />
        </button>

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
              console.log(e.target.value);
              dispatch({ type: 'CHANGE_DEADLINE', payload: e.target.value });
            }}
          />
        </div>

        <button type="submit" className="btn">
          create
        </button>
        <p className="Form__note">
          You can update all fields later in your dashboard!
        </p>
      </form>
    </div>
  );
};

export default NewTaskForm;
