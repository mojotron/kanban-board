// stylesheet
import './NewProjectForm.css';
// icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
// react hooks
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  MutableRefObject,
  FormEvent,
} from 'react';
// store
import { useKanbanStore } from '../../../../store';
// firestore
import { useFirestore } from '../../../../hooks/useFirestore';
import { ProjectType } from '../../../../types/projectType';
import { useUserData } from '../../../../context/UserDataContext';

const NewProjectForm = () => {
  const { document } = useUserData();

  const closeModal = useKanbanStore((state) => state.setOpenNewProjectModal);
  const { pending, error, addDocument, updateDocument } = useFirestore();

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

  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleCloseModal = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal(false);
    },
    [closeModal]
  );

  useEffect(() => {
    usernameRef?.current?.focus();

    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
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
      });
      await updateDocument('users', document.uid, {
        projects: [...document.projects, newProject?.id],
      });
      closeModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <form className="NewProjectForm" onSubmit={handleSubmit}>
        <button
          className="btn--icon"
          type="button"
          onClick={() => closeModal(false)}
        >
          <AiOutlineCloseCircle size={30} color="var(--COLOR-ACCENT-500)" />
        </button>

        <h2 className="heading--secondary">New Project</h2>
        <div className="NewProjectForm__item">
          <label htmlFor="new-project-name">Project Name</label>
          <input
            id="new-project-name"
            type="text"
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

        <div className="NewProjectForm__item">
          <label htmlFor="new-project-description">Project description</label>
          <textarea
            id="new-project-description"
            placeholder="write short description what is project about"
            required
            maxLength={2200}
            value={state.description}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value })
            }
          />
        </div>

        <div className="NewProjectForm__item">
          <label htmlFor="project-tags">Tags</label>
          <div className="NewProjectForm__item__wrapper">
            <input
              id="project-tags"
              type="text"
              placeholder="project keywords e.g. 'react'"
              maxLength={35}
              value={state.currentTag}
              onChange={(e) =>
                dispatch({ type: 'CHANGE_TAG', payload: e.target.value })
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
          <div className="NewProjectForm__item__tags-wrapper">
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

        <div className="NewProjectForm__item mb--lg">
          <label htmlFor="new-project-repo">Project repository</label>
          <input
            id="new-project-repo"
            type="text"
            placeholder="projects github page"
            value={state.repository}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_REPO', payload: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn">
          create
        </button>
        <p className="NewProjectForm__note">
          You can update all fields later in your dashboard!
        </p>
      </form>
    </div>
  );
};

export default NewProjectForm;
