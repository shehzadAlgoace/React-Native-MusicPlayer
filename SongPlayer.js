/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import React, {useRef, useState} from 'react';
// import Modal from 'react-native-modal';
// import LinearGradient from 'react-native-linear-gradient';
// import Slider from '@react-native-community/slider';
// import TrackPlayer, {State} from 'react-native-track-player';
// const SongPlayer = ({
//   songsList,
//   currentIndex,
//   progress,
//   playbackState,
//   isVisible,
//   onClose,
//   onChange,
// }) => {
//   const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
//   const audioRef = useRef(null);
//   const format = seconds => {
//     let mins = parseInt(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   // console.log('progress.position', progress.position);
//   console.log('progress.position', progress.duration);
//   return (
//     <Modal isVisible={isVisible} style={{margin: 0}}>
//       <LinearGradient
//         colors={['#067a02', '#064f03', '#032901', '#000000']}
//         style={{flex: 1}}>
//         <TouchableOpacity
//           style={{marginTop: 20, marginLeft: 20}}
//           onPress={() => {
//             onClose();
//           }}>
//           <Image
//             source={require('./src/images/down-arrow.png')}
//             style={{
//               width: 30,
//               height: 30,
//               tintColor: 'white',
//             }}
//           />
//         </TouchableOpacity>

//         <Image
//           source={{uri: songsList[currentSongIndex]?.artwork}}
//           style={{
//             width: '80%',
//             height: '35%',
//             alignSelf: 'center',
//             marginTop: 20,
//             borderRadius: 5,
//           }}
//         />
//         <Text
//           style={{
//             fontSize: 30,
//             color: 'white',
//             fontWeight: '600',
//             marginLeft: 20,
//             marginTop: 20,
//           }}>
//           {songsList[currentSongIndex]?.title}
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             color: 'white',
//             fontWeight: '600',
//             marginLeft: 20,
//           }}>
//           {songsList[currentSongIndex]?.artist}
//         </Text>
//         <Slider
//           value={progress?.position}
//           style={{width: '90%', height: 40, alignSelf: 'center'}}
//           minimumValue={0}
//           maximumValue={progress?.duration}
//           minimumTrackTintColor="#FFFFFF"
//           maximumTrackTintColor="#fff"
//           onValueChange={x => audioRef.current?.seek(x)}
//         />
//         <View
//           style={{
//             width: '90%',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignSelf: 'center',
//           }}>
//           <Text style={{color: 'white'}}>{format(progress?.position)}</Text>
//           <Text style={{color: 'white'}}>{format(progress?.duration)}</Text>
//         </View>
//         <View
//           style={{
//             width: '100%',
//             justifyContent: 'space-evenly',
//             alignItems: 'center',
//             flexDirection: 'row',
//             alignSelf: 'center',
//             marginTop: 30,
//           }}>
//           <TouchableOpacity
//             onPress={async () => {
//               if (currentSongIndex > 0) {
//                 await TrackPlayer.skip(currentSongIndex - 1);
//                 await TrackPlayer.play();
//                 setCurrentSongIndex(currentSongIndex - 1);
//                 onChange(currentSongIndex - 1);
//               }
//             }}>
//             <Image
//               source={require('./src/images/previous.png')}
//               style={{width: 35, height: 35, tintColor: 'white'}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 30,
//               backgroundColor: 'white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={async () => {
//               if (State.Playing === playbackState) {
//                 await TrackPlayer.pause();
//               } else {
//                 await TrackPlayer.skip(currentIndex);
//                 await TrackPlayer.play();
//               }
//               console.log('🚀 ~ onPress={ ~ currentIndex:', currentIndex);
//             }}>
//             <Image
//               source={
//                 State.Playing === playbackState
//                   ? require('./src/images/pause2.png')
//                   : require('./src/images/play.png')
//               }
//               style={{width: 30, height: 30}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={async () => {
//               await TrackPlayer.skip(currentSongIndex + 1);
//               await TrackPlayer.play();
//               setCurrentSongIndex(currentSongIndex + 1);
//               onChange(currentSongIndex + 1);
//             }}>
//             <Image
//               source={require('./src/images/next.png')}
//               style={{width: 35, height: 35, tintColor: 'white'}}
//             />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </Modal>
//   );
// };

// export default SongPlayer;

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State} from 'react-native-track-player';

const SongPlayer = ({
  songsList,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onClose,
  onChange,
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSliderChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  const playPauseToggle = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipToPrevious = async () => {
    if (currentSongIndex > 0) {
      await TrackPlayer.skip(currentSongIndex - 1);
      setCurrentSongIndex(currentSongIndex - 1);
      onChange(currentSongIndex - 1);
    }
  };

  const skipToNext = async () => {
    if (currentSongIndex < songsList.length - 1) {
      await TrackPlayer.skip(currentSongIndex + 1);
      setCurrentSongIndex(currentSongIndex + 1);
      onChange(currentSongIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentSongIndex(currentIndex);
  }, [currentIndex]);
  console.log('progress?.position', progress?.position);
  return (
    <Modal isVisible={isVisible} style={{margin: 0}}>
      <LinearGradient
        colors={['#067a02', '#064f03', '#032901', '#000000']}
        style={{flex: 1}}>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 20}}
          onPress={onClose}>
          <Image
            source={require('./src/images/down-arrow.png')}
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        </TouchableOpacity>

        <Image
          source={{uri: songsList[currentSongIndex]?.artwork}}
          style={{
            width: '80%',
            height: '35%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
            marginTop: 20,
          }}>
          {songsList[currentSongIndex]?.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
          }}>
          {songsList[currentSongIndex]?.artist}
        </Text>

        <Slider
          value={progress?.position}
          style={{width: '90%', height: 40, alignSelf: 'center'}}
          minimumValue={0}
          maximumValue={progress?.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
          onValueChange={handleSliderChange}
        />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>{formatTime(progress?.position)}</Text>
          <Text style={{color: 'white'}}>{formatTime(progress?.duration)}</Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Image
              source={require('./src/images/previous.png')}
              style={{width: 35, height: 35, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={playPauseToggle}>
            <Image
              source={
                playbackState === State.Playing
                  ? require('./src/images/pause2.png')
                  : require('./src/images/play.png')
              }
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Image
              source={require('./src/images/next.png')}
              style={{width: 35, height: 35, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default SongPlayer;
