import { Text, View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import RouterCustomer from "../routers/RouterCustomer";
import Profile from "./Profile";
import Appointments from "./Appointments";
import Transaction from "./Transaction";

const Tab = createMaterialBottomTabNavigator()
const Customer = () =>{
    return(
       <Tab.Navigator>
        <Tab.Screen name="RouterCustomer" component={RouterCustomer}
        options={{title:"Home",tabBarIcon:"home"}}/> 
        <Tab.Screen name="Appointments" component={Appointments}
        options={{tabBarIcon:"cash"}}/>
        <Tab.Screen name="Profile" component={Profile}
        options={{tabBarIcon:"account"}}/> 
       </Tab.Navigator>
    )
}
export default Customer;