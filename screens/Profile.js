import React, {useEffect} from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper"
import { useMyContextController, logout } from "../store";

const Profile = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])

    const handleLogout = () => {
        logout(dispatch);
    };

    return(
        <View style={{ flex: 1 }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Profile Screens</Text>
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.email}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Full Name: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.fullName}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phone: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.phone}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Role: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.role}</Text>
                </View>
            )}
            <TouchableOpacity style={{margin:10, backgroundColor:"navy", padding:10}}
                onPress={()=>navigation.navigate("ChangePassword")}
            >
                <Text style={{fontSize: 20, color:"white", alignSelf:'center'}}>Change Password</Text>
            </TouchableOpacity>

            <Button buttonColor="red"
                textColor="white"
                mode="contained"
                onPress={handleLogout}
                style={{margin: 10}}>
                    Sign out
            </Button>
        </View>
    )
}
export default Profile;