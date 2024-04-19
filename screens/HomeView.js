import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const HomeView = ({navigation, route}) => {    

    const [video, setViedo] = useState([])

    useEffect(()=> {
        navigation.setOptions({
            title: "Videos from Wired Magazine",
            headerTitleStyle: {
                fontWeight: '900'
            },      
            headerRight: () => (
                <TouchableOpacity style={{margin: 12}} onPress={navigateToFavorite}>
                    <MaterialCommunityIcons name="heart-box" size={18} color="black" />
                </TouchableOpacity>
            ),
        })

        fetch('https://api.dailymotion.com/user/x1audmk/videos?limit=20')
            .then((response) => response.json())
            .then((json)=>{
                setViedo(json.list)
            })
            .catch((error)=>{
                console.error(error)
            })
    }, [])

    const navigateToFavorite = () => {
        navigation.navigate('Favorite')
    }

    const navigateToVideo = (id) => {
        console.log(`pressed: ${id}`)
        navigation.navigate('Video', {videoID: id})
    }

    return(
        <View style={styles.container}>
            <FlatList
            data={video}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.listItemView} onPress={()=>navigateToVideo(item.id)}>
                    <Text style={styles.listItemText}>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
        />
        </View>
    )
}

export default HomeView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    txtViewFavorites: {
        fontWeight: '500'
    },
    listItemView: {
        flexDirection:"row",
        alignItems:"center",
        margin: 20,
    },
    listItemText: {

    },
})