import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// firebase
import FirebaseHelper from '../firebase/firebaseHelper'

const FavoriteList = ({navigation, route}) => {

    const [favorite, setFavorite] = useState([])

    useEffect(()=>{
        // Setup header
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{margin: 15}} onPress={deleteAllPress}>
                    <Text style={{color: 'red'}}>Clear favorite</Text>
                </TouchableOpacity>
            ),
        })

    }, [])

    useEffect(()=>{
        // Data retrieve
        let resultData = []
        const querySnapshot = FirebaseHelper.getAllFavorite()
        querySnapshot.then((docs)=>{
            docs.forEach((data)=>{
                resultData.push({
                    documentID: data.id,
                    id: data.data().id,
                    title: data.data().title
                })
            })
            setFavorite(resultData)
            console.log(`setFavorite: ${resultData}`)
        })

    }, [])

    const navigateToVideo = (id) => {
        console.log(`pressed: ${id}`)
        navigation.navigate('Video', {videoID: id})
    }

    const deleteAllPress = () => {
        console.log(`favorite: ${favorite}`)
        FirebaseHelper.removeAll()
        setFavorite([])
    }

    return(
        <View style={styles.container}>
            {favorite.length===0 ? <View style={styles.viewNoData}><Text style={styles.txtNoData}>No favorites found</Text></View> : <FlatList
                data={favorite}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.listItemView} onPress={()=>navigateToVideo(item.id)}>
                        <Text style={styles.listItemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.documentID}
            />}
        </View>
    )
}

export default FavoriteList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    listItemView: {
        flexDirection:"row",
        alignItems:"center",
        margin: 20,
    },
    listItemText: {

    },
    viewNoData: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    txtNoData: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        // fontWeight: '600',
    }
})