import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import Flag from 'react-native-flags';
import Sound from 'react-native-sound';
import ArabLeagueFlag from '../../images/arab-league-flag.png';
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';

Sound.setCategory('Playback');

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
});

export interface Track {
  key: string;
  name: string;
  flag: string;
  player: Sound;
}

export interface CurrentTrack {
  key: string | null;
  isStarted: boolean;
  isPlaying: boolean;
}

interface Props {
  track: Track;
  currentTrack: CurrentTrack;
  play: (track: Track) => void;
  pause: (track: Track) => void;
  stop: (track: Track) => void;
}

const Pitch: React.FC<Props> = ({ track, currentTrack, play, pause, stop }) => {
  const language = track.name;
  const isCurrentTrack = currentTrack.key === track.key;

  return (
    <View style={styles.item}>
      <View style={styles.text}>
        {track.flag === 'AR' ? (
          <Image source={ArabLeagueFlag} style={{ top: 6, height: 20, width: 32 }} />
        ) : (
          <Flag type='flat' code={track.flag} size={32} />
        )}
        <Separator width={1} />
        <Text>{language.charAt(0).toUpperCase() + language.slice(1)}</Text>
      </View>
      <View style={styles.actions}>
        {isCurrentTrack && currentTrack.isStarted ? (
          <>
            <IconButton iconName='stop' onPress={() => stop(track)} />
            <Separator width={1} />
          </>
        ) : null}
        {isCurrentTrack && currentTrack.isPlaying && currentTrack.isStarted ? (
          <IconButton iconName='pause' onPress={() => pause(track)} />
        ) : (
          <IconButton iconName='play' onPress={() => play(track)} />
        )}
      </View>
    </View>
  );
};

export default Pitch;
