import { Modal } from 'native-base';
import * as React from 'react';
import { ScrollView } from 'react-native';

const CustomModal: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
  content: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}> = ({ title, content, size, visible, setVisible }) => {
  return (
    <>
      <Modal isOpen={visible} onClose={setVisible} size={size ? size : 'md'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <>{content}</>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CustomModal;
