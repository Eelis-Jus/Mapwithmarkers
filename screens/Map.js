import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function Map() {

    const [markers, Setmarkers] = useState([])
    
    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        Setmarkers(m => [...m,coords])
    }

    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })


    const getUserPosition = async () =>{
    let{status} = await Location.requestForegroundPermissionsAsync()

    try{
        if(status !== 'granted'){
            console.log('Geolocation failed')
            return
        }
        const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
    }catch (error){
        console.log(error)
    }    
    }

    useEffect(()=>{
        (async () =>{
            getUserPosition()
        })()
    },[])

    /*
            <MapView
        style={styles.map}
        region={location}
        onLongPress={showMarker}
        >
            {marker &&
                <Marker
                title="My marker"
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                />
            }
            </MapView>
    */


    return (
        <MapView
        style={styles.map}
        region={location}
        onLongPress={showMarker}
        >
        {markers.map((marker, index) => (
        <Marker
        key={index}    
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        title='myMarker'
         />
  ))}
            </MapView>
    )
}

const styles=StyleSheet.create({
    map:{
        height:'100%',
        width: '100%'
    }
})