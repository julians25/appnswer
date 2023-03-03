import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Button, Image,ScrollView } from 'react-native';
import { Avatar, Icon, SearchBar, ListItem } from 'react-native-elements';
import firebase from '../Database/connection';
const categories = (props) => {

    const [questions, setquestions] = useState([])
    const [categorie, setcategorie] = useState('Bases de datos')

    useEffect(() => {
        const questions = [];
        firebase.db.collection('questions').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let item = doc.get('categoria')
                if (item.indexOf(props.route.params.doc) !== -1) {
                    const { titulo, usuario, perfil, imagen, email,categoria } = doc.data();
                    questions.push({
                        id: doc.id,
                        titulo,
                        usuario,
                        perfil,
                        imagen,
                        email,
                        categoria
                    });
                }

            })
            setquestions(questions)
        })
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
                        <ListItem.Chevron />
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
    TextButt: {
        marginTop:30,
        color: "#fff8dc",
        //fontFamily: "Cooper Black"
    },
    logoOff: {
        width: 0,
        height: 0,
    }

})
export default categories