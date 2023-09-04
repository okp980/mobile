import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Markdown from 'react-native-markdown-package';
import {COLORS} from '../../constants/theme';

const CustomMarkDown = ({children, styles, ...props}) => {
  return (
    <Markdown {...props} styles={[customStyles.markdown, styles]}>
      {children}
    </Markdown>
  );
};

export default CustomMarkDown;

const customStyles = StyleSheet.create({
  markdown: {
    heading1: {
      color: COLORS.title,
    },
    heading2: {
      color: COLORS.title,
    },
    strong: {
      color: 'blue',
    },
    em: {
      color: 'cyan',
    },
    text: {
      color: COLORS.text,
      fontSize: 8,
    },
    blockQuoteText: {
      color: 'grey',
    },
    blockQuoteSection: {
      flexDirection: 'row',
    },
    blockQuoteSectionBar: {
      width: 3,
      height: null,
      backgroundColor: '#DDDDDD',
      marginRight: 15,
    },
    codeBlock: {
      fontFamily: 'Courier',
      fontWeight: '500',
      backgroundColor: '#DDDDDD',
    },
    tableHeader: {
      backgroundColor: 'grey',
    },
  },
});
