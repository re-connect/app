import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import EnableBeneficiaryForm from '../components/Beneficiaries/Enable/EnableBeneficiaryForm';
import Screen from '../components/Screen';
import Separator from '../components/UI/Separator';
import Text from '../components/UI/Text';
import { colors } from '../style';

const styles = StyleSheet.create({
  textContainer: {
    margin: 32,
    paddingHorizontal: 32,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.whiteTransparent,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  text: {
    color: colors.primary,
    textAlign: 'justify',
  },
});

const EnableBeneficiaryScreen: React.FC = () => (
  <Screen>
    <Separator height={2} />
    <View style={styles.textContainer}>
      <Text style={styles.text}>enable_beneficiary_text</Text>
    </View>
    <Separator height={2} />
    <EnableBeneficiaryForm />
  </Screen>
);

export default EnableBeneficiaryScreen;
