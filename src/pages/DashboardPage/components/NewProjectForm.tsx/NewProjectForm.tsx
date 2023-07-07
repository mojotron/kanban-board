import './NewProjectForm.css';

const NewProjectForm = () => {
  return (
    <form className="NewProjectForm">
      <h2 className="heading--secondary">New Project</h2>

      <label className="NewProjectForm__label">
        Project name
        <input type="text" />
      </label>
      <label className="NewProjectForm__label">
        Project description
        <textarea />
      </label>
      <label className="NewProjectForm__label">
        Tags
        <input type="text" />
        <button type="button">Add</button>
      </label>
      <label className="NewProjectForm__label">
        Project repository
        <input type="text" />
      </label>

      <button type="submit" className="btn">
        create
      </button>
    </form>
  );
};

export default NewProjectForm;
