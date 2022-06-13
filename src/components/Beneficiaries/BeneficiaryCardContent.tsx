import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import { UserInterface } from '../../types/Users';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  icon: {
    fontSize: 40,
    color: colors.darkGray,
  },
  iconconContainer: {
    marginRight: 8,
    borderRadius: 4,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullName: {
    flex: 1,
    fontWeight: 'bold',
  },
  username: {
    flex: 1,
  },
});

interface BeneficiaryCardContentProps {
  beneficiary: UserInterface;
}

const BeneficiaryCardContent: React.FC<BeneficiaryCardContentProps> = ({ beneficiary }) => (
  <View style={styles.content}>
    <View style={styles.iconconContainer}>
      <Icon style={styles.icon} name="user" solid />
    </View>
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text style={styles.fullName}>
        {beneficiary.prenom} {beneficiary.nom}
      </Text>
      <Text style={styles.username}>{beneficiary.username}</Text>
    </View>
  </View>
);

export default BeneficiaryCardContent;
