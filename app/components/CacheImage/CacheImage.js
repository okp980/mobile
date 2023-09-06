import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/theme';

export default ({
  style,
  source: {uri},
  backgroundColor,
  useLibraryResizeMode,
  resizeMode,
}) => (
  <FastImage
    source={{uri: uri || '', priority: FastImage.priority.normal}}
    resizeMode={
      resizeMode
        ? resizeMode
        : useLibraryResizeMode
        ? FastImage.resizeMode.contain
        : 'cover'
    }
    {...{
      backgroundColor: !uri && !backgroundColor ? COLORS.gray : backgroundColor,
      style,
    }}
  />
);
