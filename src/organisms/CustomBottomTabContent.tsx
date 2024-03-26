import { View,Text,StyleSheet } from "react-native";

const CustomBottomTabContent = ({ state, descriptors, navigation }: any) => {
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <Text
              key={index}
              onPress={onPress}
              style={[
                styles.tabBarItem,
                isFocused && styles.selectedItem,
              ]}
            >
              {label}
            </Text>
          );
        })}
      </View>
    );
  };

  export default CustomBottomTabContent;

  const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        paddingVertical: 10,
      },
      tabBarItem: {
        fontSize: 16,
        padding: 7,
        color:'black'
      },
      selectedItem: {
        color: 'red',
      },
  })