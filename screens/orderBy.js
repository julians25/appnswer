import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image,ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../Database/connection';


const orderBy = (props) => {

    const [questions, setquestions] = useState([])

    useEffect(() => {
        const questions = [];
        firebase.db.collection('questions').orderBy('likes', 'desc').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                const { titulo, usuario, perfil, imagen, email } = doc.data();
                questions.push({
                    id: doc.id,
                    titulo,
                    usuario,
                    perfil,
                    imagen,
                    email
                });
            });
            setquestions(questions)
        });

    }, []);
    return (
        <ScrollView style={styles.container}>

            {
                questions.map(question => {
                    return (
                        <ListItem
                            key={question.id} bottomDivider onPress={() => {
                                props.navigation.navigate('question', { questionId: question.id })
                            }}
                        >
                            <ListItem.Content>
                                <View style={styles.CenterRow}>
                                    <Avatar source={{ uri: question.perfil }} rounded />
                                    <Text>{question.usuario}</Text>
                                </View>
                                <ListItem.Subtitle>Categoria: {question.categoria}</ListItem.Subtitle>
                                <ListItem.Subtitle>{question.titulo}</ListItem.Subtitle>
                                <Image style={question.imagen !== null ? styles.logo : styles.logoOff} resizeMode="contain"
                                    source={{ uri: question.imagen }} />

                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 300,
        height: 200,

    },
    CenterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    center:{
    backgroundColor:"#daa520",
     alignItems:"center"
     
    },
    logoOff: {
        width: 0,
        height: 0,
    }

})

export default orderBy