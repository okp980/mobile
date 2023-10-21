import {View, Text} from 'react-native';
import React from 'react';

const ColorAttribute = ({colors, handleAttributes}) => {
  const [selected, setSelected] = useState('');
  return (
    <View
      style={{
        // display: 'flex',
        // flexDirection: 'row',
        marginBottom: 10,
        // alignItems: 'center',
      }}>
      <View style={{marginRight: 10}}>
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontBold,
            marginBottom: 10,
            textTransform: 'capitalize',
          }}>
          Color : {selected}
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {colors.map((color, i) => (
          <View key={i}>
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                backgroundColor: 'transparent',
                borderRadius: 15,
                borderWidth: i === 0 ? 1 : 0,
                marginRight: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setSelected(color.name);
                handleAttributes({Color: color.name});
              }}>
              <View
                key={i}
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: color.value,
                  borderRadius: 25 / 2,
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ColorAttribute;
