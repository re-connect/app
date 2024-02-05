import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button, HStack, View, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import HTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screen from '../../components/Screen';
import Text from '../../components/UI/Text';
import TogglePrivacySwitch from '../../components/UI/TogglePrivacySwitch';
import NoteContext from '../../context/NoteContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import { NoteInterface } from '../../types/Note';

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  container: { paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'stretch' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
});

type NoteScreenParams = {
  Note: { noteId: number; beneficiaryId: number };
};
type Props = {
  route: RouteProp<NoteScreenParams, 'Note'>;
  navigation: NavigationProp<any, any>;
};

const NoteScreen: React.FC<Props> = ({ route, navigation }) => {
  const contentWidth = useWindowDimensions().width;
  const { list } = React.useContext(NoteContext);
  const { noteId } = route.params;
  const { isDeleting, deleteItem } = useDeleteData(NoteContext, `notes/${noteId}`, noteId);
  if (!list) return null;
  const note = list.find((note: NoteInterface) => note.id === noteId);
  if (!note) return null;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <VStack justifyContent="center" rounded="2xl" bg={colors.white} shadow={3} m="2" p="4">
          <HStack justifyContent="flex-end">
            <TogglePrivacySwitch
              Context={NoteContext}
              isPrivate={note.b_prive}
              itemId={noteId}
              endpoint={`notes/${noteId}`}
            />
          </HStack>
          <HStack>
            <Text style={styles.title}>{note?.nom}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Icon style={styles.icon} name="clipboard" color={colors.gray} />
            <HTML source={{ html: note.contenu }} contentWidth={contentWidth} />
          </HStack>
          <HStack justifyContent="space-between">
            <View>
              <Button onPress={() => navigation.navigate('EditNote', { noteId: note.id })}>
                <Icon style={styles.icon} name="pen" color={colors.darkGray} />
              </Button>
            </View>
            <View>
              <Button onPress={() => deleteItem(true)} disabled={isDeleting}>
                {isDeleting ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Icon style={styles.icon} name="trash" color={colors.red} />
                )}
              </Button>
            </View>
          </HStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default NoteScreen;
