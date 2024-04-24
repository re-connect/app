import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import IconButton from '../../components/UI/IconButton';
import List from '../../components/UI/List';
import Text from '../../components/UI/Text';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import EventContext from '../../context/EventContext';
import { getDateColour, getReadableDate } from '../../helpers/dateHelpers';
import { useFetchData } from '../../hooks/DataHooks';
import { useSetTitleToBenefName } from '../../hooks/UserHooks';
import { colors } from '../../style';
import { AnyDataInterface } from '../../types/Data';
import Icon from '../../components/UI/Icon';

const styles = StyleSheet.create({
  container: { justifyContent: 'flex-start', alignItems: 'stretch', flex: 1 },
  dateText: { fontSize: 14 },
  icon: { fontSize: 20, marginHorizontal: 16 },
});

type Props = {
  navigation: StackNavigationProp<any>;
};

const getEventName = (item: AnyDataInterface) => item.nom;
const getEndpoint = () => 'events';

const getEventSubtitle =
  (item: AnyDataInterface): React.FC =>
  () => {
    if (!item.date) {
      return null;
    }
    const date = new Date(item.date);
    return (
      <View>
        <Text style={{ ...styles.dateText, color: colors.darkGray }}>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
        <Text style={{ ...styles.dateText, color: getDateColour(date) }}>{getReadableDate(date)}</Text>
      </View>
    );
  };

const getEventDetails =
  (event: AnyDataInterface): React.FC =>
  () => {
    if (!event.rappels) {
      return null;
    }
    if (event.rappels && event.rappels.length === 0) {
      return null;
    }
    return <Icon style={styles.icon} name='bell' color={colors.gray} />;
  };

const EventsScreen: React.FC<Props> = ({ navigation }) => {
  useSetTitleToBenefName();
  const { current } = React.useContext(BeneficiaryContext);
  const { isFetching, triggerFetch } = useFetchData(EventContext, `beneficiaries/${current?.subject_id}/events`);
  const { list } = React.useContext(EventContext);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: 'absolute', right: 5, bottom: 5, zIndex: 1 }}>
          <IconButton size={60} iconName='plus' onPress={() => navigation.navigate('CreateEvent')} />
        </View>
        <List
          data={list}
          getName={getEventName}
          getSubtitle={getEventSubtitle}
          isFetchingData={isFetching}
          itemIconName='calendar-day'
          onItemPress={(item: AnyDataInterface) => navigation.navigate('Event', { eventId: item.id })}
          triggerFetchData={triggerFetch}
          getItemRightComponent={getEventDetails}
          getDataContext={() => EventContext}
          getLeftActionEndpoint={getEndpoint}
          getRightActionEndpoint={getEndpoint}
        />
      </View>
    </Screen>
  );
};
export default EventsScreen;
