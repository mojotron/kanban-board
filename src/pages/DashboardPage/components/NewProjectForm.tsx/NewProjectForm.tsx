import './NewProjectForm.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const NewProjectForm = () => {
  return (
    <div className="overlay">
      <form className="NewProjectForm">
        <button className="btn--icon" type="button">
          <AiOutlineCloseCircle size={30} color="var(--COLOR-ACCENT-500)" />
        </button>

        <h2 className="heading--secondary">New Project</h2>
        <div className="NewProjectForm__item">
          <label htmlFor="new-project-name">Project Name</label>
          <input
            id="new-project-name"
            type="text"
            placeholder="My Secret Project"
            required
            maxLength={100}
          />
        </div>
        <div className="NewProjectForm__item">
          <label htmlFor="new-project-description">Project description</label>
          <textarea
            id="new-project-description"
            placeholder="write short description what is project about"
            required
            maxLength={2200}
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
            />
            <button type="button" className="btn">
              Add
            </button>
          </div>
        </div>
        <div className="NewProjectForm__item mb--lg">
          <label htmlFor="new-project-repo">Project repository</label>
          <input
            id="new-project-repo"
            type="text"
            placeholder="projects github page"
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
