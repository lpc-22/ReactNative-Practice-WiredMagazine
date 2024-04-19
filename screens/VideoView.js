import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// firebase
import FirebaseHelper from '../firebase/firebaseHelper'

const VideoView = ({navigation, route}) => {
    const videoID = route.params.videoID

    const [videoDetail, setViedoDetail] = useState({})
    const [liked, setLiked] = useState(false)

    useEffect(()=>{
        fetch(`https://api.dailymotion.com/video/${videoID}?fields=thumbnail_240_url,description,views_total,title,created_time`)
            .then((response) => response.json())
            .then((json)=>{
                console.log(`going to setVideoDetail`)
                setViedoDetail(json)
            })
            .catch((error)=>{
                console.error(error)
            })
    }, [])

    useEffect(()=>{
        // console.log(`videoDescription: ${JSON.stringify(videoDetail.description)}`)
        console.log(`link: ${videoDetail.thumbnail_240_url}`)
    }, [videoDetail])

    const addToFavorite = () => {
        FirebaseHelper.addVideoToFavorite(videoID, videoDetail.title)
        setLiked(true)
    }

    return(
        <ScrollView>
            <Image
                style={{width: '100%', height: 'auto', minHeight: 200, backgroundColor: 'grey'}}
                source={{url: videoDetail.thumbnail_240_url}}
            />


            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <Text style={styles.title}>{videoDetail.title}</Text>    
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        {liked? 
                        <FontAwesome name="heart" size={24} color="red" />
                        :
                        <TouchableOpacity onPress={addToFavorite}>
                            <FontAwesome name="heart-o" size={24} color="black" />
                        </TouchableOpacity>}
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <MaterialCommunityIcons name="eye-outline" size={15} color="black" />
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={styles.txtTotalView}>{videoDetail.views_total}</Text>
                    </View>
                </View>

                <Text style={styles.description}>{videoDetail.description}</Text>
            </View>
        </ScrollView>
    )
}

export default VideoView

const styles = StyleSheet.create({
    container: {
        padding:15,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
    },
    description: {
        fontSize: 15,
    },
    viewContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    txtTotalView: {
        fontSize: 14,
    },
})