import styles from './ProjectMessages.module.css';
import TextboxInput from '../../../../components/TextboxInput/TextboxInput';
import MessageList from './MessageList';

const ProjectMessages = () => {
  return (
    <section className={styles.messages}>
      <h3 className="heading--tertiary">Messages</h3>
      <MessageList />
      <TextboxInput onSubmitClick={() => console.log('works')} />
    </section>
  );
};

export default ProjectMessages;
