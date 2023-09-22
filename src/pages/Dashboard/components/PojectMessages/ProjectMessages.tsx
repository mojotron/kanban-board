import styles from './ProjectMessages.module.css';
import TextboxInput from '../../../../components/TextboxInput/TextboxInput';
import MessageList from './MessageList';
import { useMessages } from '../../../../hooks/useMessages';
import { useKanbanStore } from '../../../../store';
import { useState } from 'react';
import { useProject } from '../../../../context/ProjectContext';

const ProjectMessages = () => {
  const { project } = useProject();
  const { addMessage } = useMessages(project?.id!);
  const updateMessage = useKanbanStore((store) => store.updateMessage);
  const [text, setText] = useState('');

  console.log(project?.messages);

  const handleSubmit = async () => {
    if (!project) return;
    await addMessage(text, project.messages);
    setText('');
  };

  return (
    <section className={styles.messages}>
      <h3>Messages</h3>
      <MessageList />
      <TextboxInput
        onSubmitClick={handleSubmit}
        text={text}
        onTextChange={setText}
      />
    </section>
  );
};

export default ProjectMessages;
