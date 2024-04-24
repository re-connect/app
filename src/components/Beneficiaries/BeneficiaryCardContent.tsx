import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../style';
import { UserInterface } from '../../types/Users';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  content: { flexDirection: 'row', alignItems: 'center', paddingTop: 8 },
  fullName: { flex: 1, fontWeight: 'bold', marginTop: 2 },
  username: { flex: 1, marginTop: 2 },
  icon: { fontSize: 40, color: colors.darkGray },
  iconconContainer: {
    marginRight: 8,
    borderRadius: 4,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface BeneficiaryCardContentProps {
  beneficiary: UserInterface;
}

const BeneficiaryCardContent: React.FC<BeneficiaryCardContentProps> = ({ beneficiary }) => (
  <View style={styles.content}>
    <View style={styles.iconconContainer}>
      <Icon style={styles.icon} name='user-large' />
    </View>
    <View>
      <Text style={styles.fullName}>
        {beneficiary.prenom} {beneficiary.nom}
      </Text>
      <Text style={styles.username}>{beneficiary.username}</Text>
    </View>
  </View>
);

export default BeneficiaryCardContent;
