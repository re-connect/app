import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import Screen from '../../components/Screen';
import Text from '../../components/UI/Text';
import TogglePrivacySwitch from '../../components/UI/TogglePrivacySwitch';
import NoteContext from '../../context/NoteContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import { NoteInterface } from '../../types/Note';
import Section from '../../components/UI/Section';
import Divider from '../../components/UI/Divider';
import { NoteScreenProps } from '../../routing/routes/types/Note';
import Icon from '../../components/UI/Icon';

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  container: { paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'stretch' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
});

const NoteScreen: React.FC<NoteScreenProps> = ({ route, navigation }) => {
  const contentWidth = useWindowDimensions().width;
  const { list } = React.useContext(NoteContext);
  const { noteId } = route.params;
  const { isDeleting, deleteItem } = useDeleteData(NoteContext, `notes/${noteId}`, noteId);
  if (!list) {
    return null;
  }
  const note = list.find((note: NoteInterface) => note.id === noteId);
  if (!note) {
    return null;
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Section>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TogglePrivacySwitch
              Context={NoteContext}
              isPrivate={note.b_prive}
              itemId={noteId}
              endpoint={`notes/${noteId}`}
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            <Text style={styles.title}>{note?.nom}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 16 }}>
            <Icon style={styles.icon} name="clipboard" color={colors.gray} />
            <HTML source={{ html: note.contenu }} contentWidth={contentWidth} />
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: note.id })}>
              <Icon style={styles.icon} name='pen' color={colors.darkGray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(true)} disabled={isDeleting}>
              {isDeleting ? (
                <ActivityIndicator size='small' color={colors.primary} />
              ) : (
                <Icon style={styles.icon} name='trash' color={colors.red} />
              )}
            </TouchableOpacity>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
};

export default NoteScreen;
