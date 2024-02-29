import * as React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { searchBeneficiaries } from '../../services/beneficiaries';
import { colors } from '../../style';
import { BeneficiaryCardInterface, BeneficiaryInterface } from '../../types/Beneficiaries';
import SearchBar from '../UI/SearchBar';
import Text from '../UI/Text';
import BeneficiaryCard from './BeneficiaryCard';

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: colors.whiteTransparent,
    borderBottomWidth: 0,
    marginBottom: 8,
    marginLeft: 0,
    borderRadius: 5,
    paddingLeft: 16,
  },
  noDataMessage: { marginTop: 32, color: colors.white, textAlign: 'center' },
});

export interface BeneficiariesListProps {
  list: BeneficiaryInterface[];
  isFetchingBeneficiaries: boolean;
  triggerFetchBeneficiaries: () => Promise<void>;
}

const BeneficiariesList: React.FC<BeneficiariesListProps> = ({
  list,
  isFetchingBeneficiaries,
  triggerFetchBeneficiaries,
}) => {
  const [search, setSearch] = React.useState<string>('');

  return (
    <View style={styles.container}>
      <SearchBar onChange={setSearch} />
      <FlatList
        ListEmptyComponent={<Text style={styles.noDataMessage}>no_beneficiary_found</Text>}
        data={searchBeneficiaries(list, search)}
        keyExtractor={(item: BeneficiaryInterface) => (item && item.id ? item.id.toString() : '')}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingBeneficiaries}
            onRefresh={triggerFetchBeneficiaries}
            tintColor={colors.white}
            enabled
          />
        }
        renderItem={({ item }: BeneficiaryCardInterface) =>
          item && item.id ? <BeneficiaryCard beneficiary={item} /> : null
        }
      />
    </View>
  );
};

export default BeneficiariesList;
