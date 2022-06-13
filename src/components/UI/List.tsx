import * as React from 'react';
import { RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors } from '../../style';
import { AnyDataInterface, ListContextInterface } from '../../types/Data';
import Card from './Card';
import ListHiddenItem from './ListHiddenItem';
import SearchBar from './SearchBar';
import Separator from './Separator';

type DataCardInterface = { item: AnyDataInterface };

interface Props {
  data: AnyDataInterface[];
  getDataContext: (item?: AnyDataInterface) => React.Context<ListContextInterface<any>>;
  getItemRightComponent?: (item: AnyDataInterface) => React.FC;
  getName: (item: AnyDataInterface) => string;
  getSubtitle?: (item: AnyDataInterface) => React.FC;
  hasThumbnail?: boolean;
  isFetchingData: boolean;
  itemIconName?: string;
  getLeftActionEndpoint: (item?: AnyDataInterface) => string;
  onItemPress: (item: AnyDataInterface) => void;
  getRightActionEndpoint: (item?: AnyDataInterface) => string;
  triggerFetchData: () => Promise<void>;
}

const List: React.FC<Props> = ({
  data,
  getDataContext,
  getItemRightComponent,
  getName,
  getSubtitle,
  hasThumbnail,
  isFetchingData,
  itemIconName,
  getLeftActionEndpoint,
  onItemPress,
  getRightActionEndpoint,
  triggerFetchData,
}) => {
  const [search, setSearch] = React.useState<string>('');
  const filteredData = data.filter((datum: AnyDataInterface) =>
    JSON.stringify(datum).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SearchBar onChange={setSearch} />
      <SwipeListView
        data={filteredData}
        closeOnScroll
        closeOnRowPress
        keyExtractor={(item: AnyDataInterface) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isFetchingData} onRefresh={triggerFetchData} tintColor={colors.white} enabled />
        }
        renderItem={({ item }: DataCardInterface) => (
          <Card
            itemId={item.id}
            onPress={() => onItemPress(item)}
            isPrivate={!!item.b_prive}
            title={getName(item)}
            iconName={itemIconName}
            hasThumbnail={hasThumbnail}
            RightComponent={!getItemRightComponent ? null : getItemRightComponent(item)}
            Subtitle={!getSubtitle ? null : getSubtitle(item)}
          />
        )}
        renderHiddenItem={(datum: DataCardInterface) => (
          <ListHiddenItem
            datum={datum}
            getLeftActionEndpoint={getLeftActionEndpoint}
            getRightActionEndpoint={getRightActionEndpoint}
            getDataContext={getDataContext}
          />
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListFooterComponent={() => <Separator height={6} />}
      />
    </>
  );
};

export default List;
