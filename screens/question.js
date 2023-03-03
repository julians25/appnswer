import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import firebase from '../Database/connection';
import { ListItem, Avatar } from 'react-native-elements'

const question = (props) => {

    const [questionst, setQuestion] = useState({
        id: '',
        titulo: '',
        pregunta: '',
        fecha: '',
        usuario: '',
        perfil: '',
        uid: '',
        likes: '',
        imagen: '',
        categoria: '',
    });

    const [answ, setAnsw] = useState([])
    const [like, setLike] = useState()

    const getQuestion = async (id) => {
        const db = firebase.db.collection('questions').doc(id)
        const doc = await db.get();
        const question = doc.data();
        setQuestion({
            ...question,
            id: doc.id
        });
    }

    useEffect(() => {
        getQuestion(props.route.params.questionId);
    })

    const getLikes = async () => {
        firebase.db.collection('questions').doc(props.route.params.questionId).collection('likes').onSnapshot(querySnapshot => {
            setLike(querySnapshot.docs.length)
        })
    }

    useEffect(() => {
        getLikes();
    })

    useEffect(() => {
        const respuestas = [];
        firebase.db.collection('questions').doc(props.route.params.questionId).collection('respuestas').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {

                const { respuesta, usuario, perfil, fecha, likes, imagen } = doc.data();
                respuestas.push({
                    id: doc.id,
                    respuesta,
                    usuario,
                    perfil,
                    fecha,
                    likes,
                    imagen
                });
            });
            setAnsw(respuestas)
        });
    }, []);


    return (
        <ScrollView>
            <View style={styles.CenterRow2}>
                <Avatar source={{ uri: questionst.perfil }}
                    rounded
                />
                <Text>
                    {questionst.usuario}
                </Text>
            </View>
            <View style={styles.titulo}>
                <Text>{questionst.titulo}</Text>
            </View>
            <View>
                <Text mutiline dataDetectorType="link"> {questionst.pregunta}</Text>
                <View style={styles.center}>
                    <Image style={questionst.imagen !== null ? styles.logo : styles.logoOff} resizeMode="contain"
                        source={{ uri: questionst.imagen }} />
                </View>
            </View>
            <View style={styles.CenterRow}>
                <View>
                    <Text>
                        {questionst.fecha}
                    </Text>
                </View>
                <View style={styles.CenterRow}>
                    <TouchableOpacity>
                        <Image style={styles.likeButon} resizeMode="contain"
                            source={require('../assets/like.png')}
                        />
                    </TouchableOpacity>
                    <Text>{like}</Text>
                </View>
            </View>

            <View style={styles.titulo}>
                <Text>Respuestas</Text>
            </View>
            {answ == 0 ? <Text>No hay respuestas</Text> :
                answ.map(answers => {
                    return (

                        <ListItem
                            key={answers.id} bottomDivider
                        >

                            <ListItem.Content>
                                <View style={styles.CenterRow}>
                                    <Avatar source={{ uri: answers.perfil }}
                                        rounded
                                    />
                                    <ListItem.Title>{answers.usuario}</ListItem.Title>
                                </View>
                                <ListItem.Subtitle>{answers.respuesta}</ListItem.Subtitle>
                                <Image style={answers.imagen !== null ? styles.logo : styles.logoOff} resizeMode="contain"
                                    source={{ uri: answers.imagen }} />

                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 250,

    },
    likeButon: {
        width: 35,
        height: 35,
    },
    CenterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal: 15,
        justifyContent: "space-between"
    },
    CenterRow2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal: 15,
    },
    center: {
        alignItems: "center"
    },
    logoOff: {
        width: 0,
        height: 0,
    },
    titulo: {
        alignItems: "center",
        marginVertical: 10
    }

})

export default question