import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import ServicesCustomer from "../screens/ServicesCustomer";
import AddNewAppointment from "../screens/AddNewAppointment";

const Stack = createStackNavigator()
const RouterCustomer = () =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="ServicesCustomer"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"navy"
            },
        }}>
            <Stack.Screen name="ServicesCustomer" component={ServicesCustomer} />
            <Stack.Screen name="AddNewAppointment" component={AddNewAppointment}/>
        </Stack.Navigator>
    )
}
export default RouterCustomer;