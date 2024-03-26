import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type MainNavigatorBottomTabParamList ={
    Photos: undefined;
    Cam: undefined;
    Maps:undefined;
    Fav:undefined;

};
export type MainNavigatorStackParamList ={
    Details: {imageUri: string, id : number, longitude: string, latitude:string};
    Photostack:undefined,
    Images:{imageUri:string[]},
    MapLocation:undefined
}

export type MainNavigatorNavigationProp = BottomTabNavigationProp<MainNavigatorBottomTabParamList>;
export type MainNavigatorStackNavigationProp = BottomTabNavigationProp<MainNavigatorStackParamList>;
export type MainNavigatorRouteProp= RouteProp<MainNavigatorBottomTabParamList>;