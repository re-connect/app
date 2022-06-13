import { useNavigation } from '@react-navigation/native';
import { Pressable, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import { UserInterface } from '../../types/Users';
import Text from '../UI/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  modalContent: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 32,
  },
  modalMenu: {
    marginTop: 32,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  icon: {
    fontSize: 20,
  },
  iconContainer: {
    marginRight: 32,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface BeneficiaryActionsModalProps {
  beneficiary: UserInterface;
  close: () => void;
}

const BeneficiaryActionsModal: React.FC<BeneficiaryActionsModalProps> = ({ beneficiary, close }) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={close}>
      <View style={styles.modalContent}>
        <View>
          <VStack style={styles.modalMenu}>
            <Pressable
              onPress={() => {
                navigation.navigate('DocumentsList', { beneficiaryId: beneficiary.id.toString() });
                close();
              }}
            >
              <View style={{ ...styles.iconContainer, backgroundColor: colors.blue }}>
                <Icon style={styles.icon} color={colors.white} name="folder-open" />
              </View>
              <Text>open</Text>
            </Pressable>
            <Pressable onPress={close}>
              <View style={{ ...styles.iconContainer, backgroundColor: colors.black }}>
                <Icon style={styles.icon} color={colors.white} name="times" />
              </View>
              <Text>cancel</Text>
            </Pressable>
          </VStack>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BeneficiaryActionsModal;
