import { Text, View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import MyStack from "../routers/MyStack"
import CustomManagement from "./CustomManagement";
import Profile from "./Profile";
import Transaction from "./Transaction";

const Tab = createMaterialBottomTabNavigator()
const Admin = () =>{
    return(
       <Tab.Navigator>
        <Tab.Screen name="MyStack" component={MyStack}
        options={{title:"Home",tabBarIcon:"home"}}/> 
        <Tab.Screen name="Transaction" component={Transaction}
        options={{tabBarIcon:"cash"}}/>
        <Tab.Screen name="Customers" component={CustomManagement}
        options={{tabBarIcon:"cog"}}/>
        <Tab.Screen name="Profile" component={Profile}
        options={{tabBarIcon:"account"}}/> 
       </Tab.Navigator>
    )
}
export default Admin