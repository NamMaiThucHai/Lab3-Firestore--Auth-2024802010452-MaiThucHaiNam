import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
const Services = ({navigation}) =>{
    const [services, setServices] = useState([])
    const [servicesData, setServicesData] = useState([])
    const cSERVICES = firestore().collection("SERVICES")
    const [name, setName] = useState("")

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
           
          });
        cSERVICES.onSnapshot(response => {
            var arr = []
            response.forEach(doc => arr.push(doc.data()))
            setServices(arr)
            setServicesData(arr)
        })
    },[])

    useEffect(()=>{
        setServicesData(services.filter(s=> s.serviceName.includes(name)))
    },[name])

    const renderItem = ({item}) =>{
        const {serviceName, price} = item
        return(
            <TouchableOpacity 
            style={{flexDirection:"row", borderWidth:1, height:60, borderRadius: 10, margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}
            onPress={()=> navigation.navigate("ServiceDetail", {item: item})}>
                <Text style={{fontSize:18, fontWeight:"bold"}}>{serviceName}</Text>
                <Text>{price}đ</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View style={{flex:1, padding: 10}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <TextInput 
            onChangeText={setName} 
            value={name} 
            label={"Tìm kiếm dịch vụ"}
            style={{borderWidth: 1}}/>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách dịch vụ
                </Text>
                <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("AddNewService")}}/>
            </View>
            <FlatList data={servicesData} keyExtractor={item => item.id} renderItem={renderItem}/>
        </View>
    )
}
export default Services