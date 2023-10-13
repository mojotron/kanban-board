import styles from './ProjectMessages.module.css';
import TextboxInput from '../../../../components/TextboxInput/TextboxInput';
import MessageList from './MessageList';
import { useMessages } from '../../../../hooks/useMessages';
import { useKanbanStore } from '../../../../store';
import { useEffect, useState } from 'react';
import { useProject } from '../../../../context/ProjectContext';

const ProjectMessages = () => {
  const { project } = useProject();
  const { addMessage, updateMessage } = useMessages(project?.id!);
  const msgToUpdate = useKanbanStore((store) => store.updateMessage);
  const setUpdateMessage = useKanbanStore((store) => store.setUpdateMessage);
  const [text, setText] = useState('');

  useEffect(() => {
    if (msgToUpdate) {
      setText(msgToUpdate.text);
    }
  }, [msgToUpdate]);

  const handleSubmit = async () => {
    if (!project) return;
    console.log('hmm');
    if (msgToUpdate === null) {
      console.log('add');

      await addMessage(text, project.messages);
      setText('');
    } else {
      if (!msgToUpdate) return;
      await updateMessage(msgToUpdate.id, text);
      setUpdateMessage(null);
      setText('');
    }
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
