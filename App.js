import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import questions from './screens/questions';
import categories from './screens/categories';
import menu from './screens/menu';
import question from './screens/question';
import orderBy from './screens/orderBy';
import search from './screens/search';

export default function App() {

  const stack = createStackNavigator()
  const stackA = createStackNavigator()

  function ScreenSerach() {
    return (
      <stack.Navigator >
        <stackA.Screen name="search" component={search} options={{
          title: 'Buscar', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
        <stackA.Screen name="question" component={question} options={{
          title: 'Preguntas', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
      </stack.Navigator>
    )
  }

  const stackB = createStackNavigator()
  function ScreenCategories() {
    return (
      <stack.Navigator >
        <stackB.Screen name="menu" component={menu} options={{
          title: 'Categorias', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
        <stackB.Screen name="categories" component={categories} options={{
          title: 'Preguntas', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
        <stackC.Screen name="question" component={question} options={{
          title: 'Preguntas', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
      </stack.Navigator>
    )
  }
  const stackC = createStackNavigator()

  function ScreenQuestions() {
    return (
      <stack.Navigator >
        <stackC.Screen name="questions" component={questions} options={{
          title: 'Preguntas', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
        <stackC.Screen name="question" component={question} options={{
          title: 'Preguntas', headerStyle: {
            backgroundColor: '#daa520'
          }
        }} />
      </stack.Navigator>
    )
  }

  const stackD = createStackNavigator()
  function ScreemOrderBy() {
    return (
      <stack.Navigator >
        <stackD.Screen name="orderBy" component={orderBy} options={{
          title: 'Preguntas', headerStyle: { backgroundColor: '#daa520' }
        }} />
        <stackD.Screen name="question" component={question} options={{
          title: 'Preguntas', headerStyle: { backgroundColor: '#daa520' }
        }} />
      </stack.Navigator>
    )
  }

  const Tab = createBottomTabNavigator();
  function Taps() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Preguntas') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          }
          else if (route.name === 'Populares') {
            iconName = focused ? 'ribbon' : 'ribbon-outline';
          }
          else if (route.name === 'Categorias') {
            iconName = focused ? 'library' : 'library-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#daa520',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Preguntas" component={ScreenQuestions} options={{ headerShown: false }} />
        <Tab.Screen name="Buscar" component={ScreenSerach} options={{ headerShown: false }} />
        <Tab.Screen name="Populares" component={ScreemOrderBy} options={{ headerShown: false }} />
        <Tab.Screen name="Categorias" component={ScreenCategories} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Taps />
    </NavigationContainer>

  );
}


