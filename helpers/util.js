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
