import React, { useEffect, useLayoutEffect, useState } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View, Image, StyleSheet, Text, TouchableOpacity} from "react-native"
import { HelperText, TextInput , Button, IconButton, Dialog, Portal, PaperProvider } from "react-native-paper"
import ImageCropPicker from "react-native-image-crop-picker"
import DatePicker from "react-native-date-picker"

const AddNewAppointment = ({navigation, route}) =>{
    const {id} = route.params.item
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [service, setService] = useState({}); 
    const [datetime, setDatetime] = useState(new Date()) 
    const APPOINTMENTS = firestore().collection("APPOINTMENTS")
    const SERVICES = firestore().collection("SERVICES")
    const [open, setOpen] = useState(false)
    
    useEffect(()=>{
      SERVICES.doc(id).onSnapshot(response =>setService(response.data()))
    }, [])
    const handleUploadImage=() =>{
        ImageCropPicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(respone => setService({...service, image: respone.path}))
        .catch(e => console.log(e.message))
    }
    const handleAddNewAppointment =()=>{
      APPOINTMENTS.add(
        {
          customerId: userLogin.email,
          serviceId: id,
          datetime,
          state: "new"
        }).then(response => APPOINTMENTS.doc(response.id).update({id: response.id}))
        navigation.navigate("Appointments")
    }
    return(
      (service!=null)&&
        <View style={{flex: 1, padding:10}}>
            <Button onPress={handleUploadImage}>Upload Image</Button>
            {(service.image)&&(<Image source={{uri: service.image}} style={{height:250}}/>)}
            <Text style={{fontSize:24, fontWeight:"bold", margin: 10}}>Service name: {service.serviceName}</Text>
            <Text style={{fontSize:24, fontWeight:"bold", margin: 10}}>Price: {service.price}</Text>
            <TouchableOpacity style={{padding: 10, backgroundColor:'#b3d1ff', borderRadius:10, marginVertical:10}} 
              onPress={()=>setOpen(true)}
            >
              <Text style={{fontSize: 20}}>Create date time: {datetime.toLocaleString('vi-VN')} </Text>
            </TouchableOpacity>
            <Button mode="contained" style={Style.button} onPress={handleAddNewAppointment}>Add New Appointment</Button>
            <DatePicker
                modal
                open={open}
                date={datetime}
                onConfirm={(date) => {
                  setOpen(false)
                  setDatetime(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
            />
      </View>
      
    )
}
export default AddNewAppointment;
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: 'navy',
        borderRadius: 5
      
    },

})
