import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../../constants/theme';
import Attributes from './attributes';
import {attributeObj, filterSelectAttr} from '../../../helpers/util';
import {useEffect} from 'react';

const ProductAttributes = ({variants, onSelectVariant}) => {
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [allAttributes] = useState(attributeObj(variants));

  useEffect(() => {
    setSelectedAttribute(allAttributes);
  }, []);

  const handleSelectAttributes = obj => {
    const [newAttr, variant_id] = filterSelectAttr(obj, allAttributes);
    onSelectVariant(variant_id);
    setSelectedAttribute(newAttr);
  };
  if (!variants) return null;
  return (
    <View style={{marginVertical: 10}}>
      <Attributes
        attributes={selectedAttribute}
        onSelectAttributes={handleSelectAttributes}
      />
    </View>
  );
};

export default ProductAttributes;

const styles = StyleSheet.create({});
