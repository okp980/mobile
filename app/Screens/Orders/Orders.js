import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {COLORS, FONTS} from '../../constants/theme';
import AllOrders from './AllOrders';
import Canceled from './Canceled';
import Completed from './Completed';
import Unpaid from './Unpaid';
import Root from '../../components/Root';
import Processing from './Processing';
import Shipped from './Shipped';

const renderScene = SceneMap({
  all: AllOrders,
  unpaid: Unpaid,
  processing: Processing,
  shipped: Shipped,
  completed: Completed,
  return: Canceled,
});

const Orders = ({navigation, route}) => {
  const layout = useWindowDimensions();
  const {params} = route;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: 'All'},
    {key: 'unpaid', title: 'Unpaid'},
    {key: 'processing', title: 'Processing'},
    {key: 'shipped', title: 'Shipped'},
    {key: 'completed', title: 'Completed'},
    {key: 'return', title: 'Returns'},
  ]);

  useEffect(() => {
    console.log(params);
    if (params && params.show) {
      const tabIndex = routes.findIndex(
        route => params?.show?.toLowerCase() === route.key.toLowerCase(),
      );
      if (tabIndex) {
        setIndex(tabIndex);
      }
    }
  }, []);

  return (
    <Root noPadding>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor={COLORS.primary}
            indicatorStyle={{backgroundColor: COLORS.primary}}
            labelStyle={{
              ...FONTS.font,

              textTransform: 'uppercase',
            }}
            scrollEnabled={true}
            tabStyle={{width: 120, height: 40}}
            style={{
              backgroundColor: 'transparent',
              elevation: 0,
              // borderBottomWidth: 1,
              // borderBottomColor: COLORS.borderColor,
            }}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </Root>
  );
};

export default Orders;
