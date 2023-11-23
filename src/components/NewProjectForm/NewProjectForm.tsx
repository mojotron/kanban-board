// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
// react hooks
import { useEffect, useReducer, useRef, FormEvent } from 'react';
// firestore
import { useFirestore } from '../../hooks/useFirestore';
import { ProjectType } from '../../types/projectType';
import { useUserData } from '../../context/UserDataContext';
import { Timestamp } from 'firebase/firestore';
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape';
// constants
import { NOTE_NEW_PROJECT } from '../../constants/displayTexts';

const NewProjectForm = ({ onClose }: { onClose: () => void }) => {
  const { document } = useUserData();
  const { pending, error, addDocument, updateDocument } = useFirestore();
  useCloseOnEscape(onClose);

  type State = {
    name: string;
    description: string;
    currentTag: string;
    tags: string[];
    repository: string;
  };

  type Action =
    | { type: 'CHANGE_NAME'; payload: string }
    | { type: 'CHANGE_DESCRIPTION'; payload: string }
    | { type: 'CHANGE_TAG'; payload: string }
    | { type: 'CHANGE_REPO'; payload: string }
    | { type: 'ADD_TAG' }
    | { type: 'REMOVE_TAG'; payload: string };

  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'CHANGE_NAME':
          return { ...state, name: action.payload };
        case 'CHANGE_DESCRIPTION':
          return { ...state, description: action.payload };
        case 'CHANGE_TAG':
          return { ...state, currentTag: action.payload };
        case 'CHANGE_REPO':
          return { ...state, repository: action.payload };
        case 'ADD_TAG':
          if (state.tags.includes(state.currentTag)) return { ...state };
          return {
            ...state,
            tags: [...state.tags, state.currentTag],
            currentTag: '',
          };
        case 'REMOVE_TAG':
          return {
            ...state,
            tags: state.tags.filter((tag) => tag !== action.payload),
          };
        default:
          return { ...state };
      }
    },
    {
      name: '',
      description: '',
      currentTag: '',
      tags: [],
      repository: '',
    }
  );

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('doc', document);

    if (!document) return;
    try {
      const newProject = await addDocument<ProjectType>('projects', {
        adminUid: document.uid,
        name: state.name,
        description: state.description,
        tags: state.tags,
        repository: state.repository,
        tasks: [],
        members: [],
        messages: [],
        requests: [],
        createdAt: Timestamp.fromDate(new Date()),
        public: false,
        finished: false,
      });
      await updateDocument('users', document.uid, {
        managingProjects: [...document.managingProjects, newProject?.id],
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <form className="Form" onSubmit={handleSubmit}>
        <ModalCloseBtn handleClose={onClose} />

        <h2 className="heading--secondary">New Project</h2>
        <div className="Form__item">
          <label htmlFor="new-project-name">Project Name</label>
          <input
            id="new-project-name"
            type="text"
            className="input"
            ref={usernameRef}
            placeholder="My Secret Project"
            required
            maxLength={100}
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_NAME', payload: e.target.value })
            }
          />
        </div>

        <div className="Form__item">
          <label htmlFor="new-project-description">Project description</label>
          <textarea
            id="new-project-description"
            className="input--text-area"
            placeholder="write short description what is project about"
            required
            maxLength={2200}
            value={state.description}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value })
            }
          />
        </div>

        <div className="Form__item">
          <label htmlFor="project-tags">Tags</label>
          <div className="Form__item__wrapper">
            <input
              id="project-tags"
              type="text"
              className="input"
              placeholder="project keywords e.g. 'react'"
              maxLength={35}
              value={state.currentTag}
              onChange={(e) =>
                dispatch({
                  type: 'CHANGE_TAG',
                  payload: e.target.value.toLowerCase(),
                })
              }
            />
            <button
              type="button"
              className="btn"
              disabled={state.currentTag === ''}
              onClick={() => dispatch({ type: 'ADD_TAG' })}
            >
              Add
            </button>
          </div>
          <div className="Form__item__tags-wrapper">
            {state.tags.map((tag, i) => (
              <p
                key={tag + i}
                className="tag"
                title="delete tag"
                onClick={() => dispatch({ type: 'REMOVE_TAG', payload: tag })}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>

        <div className="Form__item mb--lg">
          <label htmlFor="new-project-repo">Project repository</label>
          <input
            id="new-project-repo"
            className="input"
            type="text"
            placeholder="projects github page"
            value={state.repository}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_REPO', payload: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn">
          {pending ? 'Loading...' : 'Create'}
        </button>

        {!error ? (
          <p className="note note--error">{error}</p>
        ) : (
          <p className="note">{NOTE_NEW_PROJECT}</p>
        )}
      </form>
    </div>
  );
};

export default NewProjectForm;
