import React from "react";
import ProfileView from "./ProfileView";
import ExerciseList from "./ExerciseList";
import TodayView from "./TodayView";
import MealView from "./MealView";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

class ProfileViewWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          dailyGoal: 0,
          todaysExercises: [],
          newExercise: {},
        }
    }

    componentDidMount() {
      this.getUserDailyActivityInfo()
    }

    addTodaysExercise(name, duration, caloriesBurned, date, id) {
      console.log(id)
      this.setState({
        newExercise: {
          name: name,
          duration: duration,
          calories: caloriesBurned,
          date: date,
          id: id
        }
      })
    }

    getUserDailyActivityInfo() {
      fetch('http://cs571.cs.wisc.edu:5000/users/' + this.props.username, {
        method: 'GET',
        headers: {
            "x-access-token": this.props.accessToken 
        }
      })

      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          dailyGoal: responseJson.goalDailyActivity,
        })
      })
    }

    removeRecentExercise() {
      this.setState({
        newExercise: {}
      })
    }

    liftState = state => {
      this.setState(state);
    }

    render() {
        return (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Today') {
                      return (
                        <Icon
                          name={
                            focused
                              ? 'today'
                              : 'today-outline'
                          }
                          size={size}
                          color={color}                        
                        />
                      );
                    } else if (route.name === 'Exercise') {
                      return (
                        <Icon
                          name={
                            focused
                              ? 'barbell'
                              : 'barbell-outline'
                          }
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name === 'Profile') {
                      return (  
                        <Icon
                          name={
                            focused
                              ? 'person'
                              : 'person-outline'
                          }
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name === 'Meal') {
                      return (
                        <Icon
                          name={
                            focused
                              ? 'restaurant'
                              : 'restaurant-outline'
                          }
                          size={size}
                          color={color}
                        />
                      );
                    }
                  },
                  tabBarInactiveTintColor: 'gray',
                  tabBarActiveTintColor: 'tomato',
                })}
              >
                <Tab.Screen
                  name="Today"
                  options={{ tabBarBadge: this.state.todaysExercises.length > 0 ? this.state.todaysExercises.length : null }}
                >
                  {(props) => <TodayView 
                                dailyGoal={this.state.dailyGoal} 
                                accessToken={this.props.accessToken}
                                recentExercise={this.state.newExercise}
                                removeRecentExercise={this.removeRecentExercise.bind(this)}
                              />}
                </Tab.Screen>

                <Tab.Screen 
                  name="Exercise" 
                >
                  {(props) => <ExerciseList 
                                accessToken={this.props.accessToken} 
                                username={this.props.username} 
                                addExercise={this.addTodaysExercise.bind(this)}
                                recentExercise={this.state.newExercise}
                                removeRecentExercise={this.removeRecentExercise.bind(this)}
                              />}
                </Tab.Screen>
                
                <Tab.Screen 
                  name="Profile"
                >
                  {(props) => <ProfileView 
                                accessToken={this.props.accessToken} 
                                username={this.props.username} 
                                liftState={this.liftState}
                              />}
                </Tab.Screen>

                <Tab.Screen
                  name="Meal"
                >
                  {(props) => <MealView
                                accessToken={this.props.accessToken}
                                username={this.props.username}
                                liftState={this.liftState}
                                navigation={this.props.navigation}
                              />}
                </Tab.Screen>
                
                
              </Tab.Navigator>
        )
    }
} 

export default ProfileViewWrapper;