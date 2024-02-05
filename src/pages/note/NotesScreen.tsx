import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import IconButton from '../../components/UI/IconButton';
import List from '../../components/UI/List';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import NoteContext from '../../context/NoteContext';
import { useFetchData } from '../../hooks/DataHooks';
import { useSetTitleToBenefName } from '../../hooks/UserHooks';
import { AnyDataInterface } from '../../types/Data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
});

type Props = {
  navigation: StackNavigationProp<any>;
};

const getNoteName = (item: AnyDataInterface) => item.nom;
const getEndpoint = () => 'notes';

const NotesScreen: React.FC<Props> = ({ navigation }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const { isFetching, triggerFetch } = useFetchData(NoteContext, `beneficiaries/${current?.subject_id}/notes`);
  const { list } = React.useContext(NoteContext);
  useSetTitleToBenefName();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: 'absolute', right: 5, bottom: 5, zIndex: 1 }}>
          <IconButton size={60} iconName='plus' onPress={() => navigation.navigate('CreateNote')} />
        </View>
        <List
          data={list}
          onItemPress={(item: AnyDataInterface) => navigation.navigate('Note', { noteId: item.id })}
          isFetchingData={isFetching}
          triggerFetchData={triggerFetch}
          itemIconName='file-alt'
          getName={getNoteName}
          getDataContext={() => NoteContext}
          getLeftActionEndpoint={getEndpoint}
          getRightActionEndpoint={getEndpoint}
        />
      </View>
    </Screen>
  );
};

export default NotesScreen;
