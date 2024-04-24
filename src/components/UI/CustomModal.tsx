import * as React from 'react';
import { Dimensions, Modal, StyleSheet, ScrollView, Text, View } from 'react-native';
import { colors } from '../../style';
import Icon from './Icon';

const CustomModal: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
  content: React.ReactNode;
}> = ({ title, content, visible, setVisible }) => {
  const closeModal = () => setVisible(false);
  return (
    <>
      {visible && <View style={styles.opacityWrapper} />}
      <Modal visible={visible} onRequestClose={closeModal} animationType='slide' transparent>
        <ModalContainer header={<ModalHeaderTitle title={title} closeModal={closeModal} />}>{content}</ModalContainer>
      </Modal>
    </>
  );
};

export interface TitleModalProps {
  title: string;
  closeModal: () => void;
}

type ModalContainerProps = {
  header?: React.ReactNode;
  children?: React.ReactNode;
};

export const ModalContainer: React.FunctionComponent<ModalContainerProps> = ({ header, children }) => {
  const marginInPx = 10;
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          {header}
          <ScrollView
            style={{
              paddingLeft: marginInPx * 2,
              paddingRight: marginInPx * 2,
              paddingBottom: marginInPx * 4,
              width: '100%',
            }}>
            {children}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export const ModalHeaderTitle: React.FunctionComponent<TitleModalProps> = ({ title, closeModal }) => {
  const userMarginInPx = 10;
  return (
    <>
      <View
        style={[
          styles.mainHeaderWrapper,
          {
            marginTop: userMarginInPx * 2,
            marginBottom: userMarginInPx * 2,
            paddingBottom: userMarginInPx * 2,
          },
        ]}>
        <Text style={styles.mainTitle}>{title}</Text>
      </View>
      <Icon name='xmark' color={colors.darkGrayTransparent} style={styles.closeButton} onPress={closeModal} />
    </>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  opacityWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: -100,
    left: -8,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    fontSize: 32,
    right: 0,
    top: 2,
    padding: 10,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '95%',
  },
  mainTitle: {
    maxWidth: '45%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  mainHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 2,
  },
  titleButtonStyle: {
    textDecorationLine: 'none',
  },
  buttonContainerStyle: {
    width: '33%',
  },
});
