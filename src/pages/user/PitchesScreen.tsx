import * as React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';
import Screen from '../../components/Screen';
import Pitch, { CurrentTrack, Track } from '../../components/User/Pitch';
import t from '../../services/translation';

Sound.setCategory('Playback');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const createPlayer = (trackKey: string): Sound => {
  return new Sound(`${trackKey}.mp3`, Sound.MAIN_BUNDLE, error => {
    if (error) {
      Alert.alert(t.t('error_generic'));

      return;
    }
  });
};

const initialCurrentTrack: CurrentTrack = { isStarted: false, isPlaying: false, key: null };

const tracks: Array<Track> = [
  { key: 'english', name: 'English', flag: 'GB', player: createPlayer('english') },
  { key: 'arabic', name: 'عرب', flag: 'AR', player: createPlayer('arabic') },
  { key: 'eastern', name: 'عرب', flag: 'AR', player: createPlayer('eastern') },
  { key: 'russian', name: 'русский', flag: 'RU', player: createPlayer('russian') },
  { key: 'pashto', name: 'پښتو', flag: 'AF', player: createPlayer('pashto') },
  { key: 'dari', name: 'دری', flag: 'AF', player: createPlayer('dari') },
  { key: 'ukrainian', name: 'український', flag: 'UA', player: createPlayer('ukrainian') },
  { key: 'romanian', name: 'Română', flag: 'RO', player: createPlayer('romanian') },
  { key: 'albanian', name: 'shqip', flag: 'AL', player: createPlayer('albanian') },
  { key: 'peul', name: 'Poular ', flag: 'SN', player: createPlayer('peul') },
  { key: 'spanish', name: 'Español', flag: 'ES', player: createPlayer('spanish') },
  { key: 'pakistan', name: 'اُردُو', flag: 'PK', player: createPlayer('pakistan') },
  { key: 'somalia', name: 'اف سومالى', flag: 'SO', player: createPlayer('somalia') },
  { key: 'srilanka', name: 'தமிழ்', flag: 'LK', player: createPlayer('srilanka') },
  { key: 'tigrinya', name: 'ትግርኛ', flag: 'ET', player: createPlayer('tigrinya') },
];

const getCurrentPlayerFromKey = (key: string | null): Sound | null => {
  const track = tracks.find((track: Track) => track.key === key);

  return track ? track.player : null;
};

const PitchesScreen: React.FC = () => {
  const [currentTrack, setCurrentTrack] = React.useState<CurrentTrack>(initialCurrentTrack);

  const getCurrentPlayer = () => getCurrentPlayerFromKey(currentTrack.key);

  const playTrack = (track: Track) => {
    if (track.key !== currentTrack.key) {
      getCurrentPlayer()?.stop();
    }
    setCurrentTrack({ key: track.key, isStarted: true, isPlaying: true });

    track.player.play(success => {
      setCurrentTrack(initialCurrentTrack);
      if (!success) {
        Alert.alert(t.t('error_generic'));
      }
    });
  };

  const stopTrack = (track: Track) => {
    track.player.stop();
    setCurrentTrack(initialCurrentTrack);
  };

  const pauseTrack = (track: Track) => {
    track.player.pause();
    setCurrentTrack({ ...track, isStarted: true, isPlaying: false });
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          {tracks.map((track: Track) => (
            <Pitch
              key={track.key}
              track={track}
              currentTrack={currentTrack}
              play={playTrack}
              pause={pauseTrack}
              stop={stopTrack}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PitchesScreen;
