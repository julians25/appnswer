import React, { useState} from 'react';
import { View, StyleSheet, ScrollView, Text, Image,Button} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../Database/connection';
import { SearchBar, Icon } from 'react-native-elements';



const search = (props) => {

    const [questions, setquestions] = useState([])
    const [searchS, setsearchS] = useState()

    const questionUser = () => {
        const questions = [];
        firebase.db.collection('questions').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let item = doc.get('titulo').toLowerCase()
                let value = searchS.toLowerCase()
                if (item.indexOf(value) !== -1) {
                    const { titulo, usuario, perfil, imagen, email } = doc.data();
                    questions.push({
                        id: doc.id,
                        titulo,
                        usuario,
                        perfil,
                        imagen,
                        email
                    });
                }
            })
            setquestions(questions)

        })
    }

    return (
        <ScrollView style={styles.container}> 
           <SearchBar
                placeholder="Type Here..."
                onChangeText={(values) => setsearchS(values)}
                value={searchS}
                lightTheme="true"
                returnKeyType="search"
                onSubmitEditing={() => questionUser()}
            />
            <View style={styles.center}>
             <Button title="Buscar" color="#daa520" onPress={() => questionUser()} />
           </View>
            {
                questions.map(question => {
                    return (
                        <ListItem
                            key={question.id} bottomDivider onPress={() => {
                                props.navigation.push('question', { questionId: question.id })
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
    center: {
        alignItems: "center",
        marginTop:10

    },
    logoOff: {
        width: 0,
        height: 0,
    }

})
export default search