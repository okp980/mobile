import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

export const getPrice = amount => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

export const getProductAttribute = variants => {
  let attriArray = [];

  for (const variant of variants) {
    for (const attrValue of variant?.attributeValue) {
      attriArray = [
        ...attriArray,
        {
          name: attrValue?.attribute?.name,
          value: attrValue?.value,
          meta: attrValue?.meta,
        },
      ];
    }
  }
  const attributeObj = attriArray.reduce((acc, obj) => {
    if (acc[obj.name]) {
      return {
        ...acc,
        [obj.name]: [...acc[obj.name], {name: obj.value, value: obj.meta}],
      };
    } else {
      return {[obj.name]: [{name: obj.value, value: obj.meta}]};
    }
  }, {});

  console.log('attributeObj ==>', attributeObj);
  return attributeObj;
};

export const getVariant = (variants, attr) => {
  const matchingItem = variants?.find(item => {
    const attributes = item.attributeValue.reduce((acc, curr) => {
      acc[curr.attribute.name] = curr.value;
      return acc;
    }, {});

    console.log('attr', attr);
    console.log('attributes', attributes);

    return Object.keys(attr).every(key => attr[key] === attributes[key]);
  });

  return matchingItem;
};

export const attributeObj = variations => {
  const attObj = {};
  for (const variants of variations) {
    for (const value of variants.attributeValue) {
      if (attObj[value.attribute.name]) {
        attObj[value.attribute.name] = [
          ...attObj[value.attribute.name],
          {value: value.value, variation_id: variants.id},
        ];
      } else {
        attObj[value.attribute.name] = [
          {value: value.value, variation_id: variants.id},
        ];
      }
    }
  }

  return attObj;
};

// Accepts an obj with values of selected field
// uses this obj make the other fiilds not in the obj
// to return values with same variation id as the fields in the obj
export const filterSelectAttr = (selectionObj, attributeObj) => {
  let filteredField = {};
  let selectedVariation_id = '';
  for (const key of Object.keys(selectionObj)) {
    selectedVariation_id = selectionObj[key].variation_id;
    break;
    // break out of the loop immediately geting the variation from one of the fields since all fields have same variation id
  }

  for (const key of Object.keys(attributeObj)) {
    if (selectionObj.hasOwnProperty(key)) {
      continue;
    } else {
      filteredField[key] = attributeObj[key].filter(val => {
        if (selectedVariation_id === val.variation_id) {
          console.log('val.variation_id', val.variation_id);
        }

        return selectedVariation_id === val.variation_id;
      });
    }
  }
  console.log('the filter fields : ', filteredField);
  console.log('the fields after filter : ', {
    ...attributeObj,
    ...filteredField,
  });

  return [{...attributeObj, ...filteredField}, selectedVariation_id];
};

export const requestPermissions = async type => {
  const selectedPerm = Platform.select({
    ios:
      type === 'location'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : type === 'contacts'
        ? PERMISSIONS.IOS.CONTACTS
        : type === 'camera'
        ? PERMISSIONS.IOS.CAMERA
        : type === 'library'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : null,
    android:
      type === 'location'
        ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        : type === 'contacts'
        ? PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        : type === 'camera'
        ? PermissionsAndroid.PERMISSIONS.CAMERA
        : type === 'library'
        ? PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        : null,
  });
  return await request(selectedPerm);
};

export const checkPermissions = async type => {
  const selectedPerm = Platform.select({
    ios:
      type === 'location'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : type === 'contacts'
        ? PERMISSIONS.IOS.CONTACTS
        : type === 'camera'
        ? PERMISSIONS.IOS.CAMERA
        : type === 'library'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : null,
    android:
      type === 'location'
        ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        : type === 'contacts'
        ? PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        : type === 'camera'
        ? PermissionsAndroid.PERMISSIONS.CAMERA
        : type === 'library'
        ? PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        : null,
  });

  return await check(selectedPerm);
};

export const routeToSettings = () =>
  openSettings().catch(() =>
    Alert.alert(
      'Error!',
      'Cannot open settings',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    ),
  );

export const displayBlockedAlert = (message = '', navigationFunc) =>
  Alert.alert(
    'Permission denied',
    message,
    [
      {
        text: 'Open settings',
        onPress: () => routeToSettings(),
      },
      {
        text: 'OK',
        onPress: navigationFunc ? navigationFunc : () => {},
      },
    ],
    {cancelable: false},
  );

export const getMaxPrice = function (array) {
  let indexOfMax = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.price_in_naira > array[indexOfMax]?.price_in_naira) {
      indexOfMax = i;
    }
  }
  return array[indexOfMax]?.price_in_naira;
};
export const getMinPrice = function (array) {
  let indexOfMax = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.price_in_naira < array[indexOfMax]?.price_in_naira) {
      indexOfMax = i;
    }
  }
  return array[indexOfMax]?.price_in_naira;
};
