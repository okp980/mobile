import React from 'react';
import {FlatList, View} from 'react-native';

export default function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <React.Fragment>
          {/*  leave enough space for better user experience */}
          <View style={{minHeight: 480}}>{props.children}</View>
        </React.Fragment>
      )}
    />
  );
}
