import React from "react";
import { Button, View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ExerciseAddModalView from "./ExerciseAddModalView";
import ExerciseView from "./ExerciseView";

class ExerciseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            exercises: [],
        }
    }

    editExercise(id, name, duration, date, calories) {
        // make a put request to the http://cs571.cs.wisc.edu:5000/activities/id/
        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/' + id + '/', {
            method: 'PUT',
            headers: {
                'x-access-token': this.props.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                duration: duration,
                date: date,
                calories: calories
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
    }


    // delete exercise given the id of the exercise make a delete request to the http://cs571.cs.wisc.edu:5000/
    deleteExercise(id) {
        // remove the exercise from the state array that has the given id
        let newExercises = this.state.exercises.filter((exercise) => {
            return exercise.id !== id;
        })
  
        if (id === this.props.recentExercise.id) {
            this.props.removeRecentExercise();
        }

        // update the state with the new array
        this.setState({
            exercises: newExercises
        })

        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/' + id + '/', {
            method: 'DELETE',
            headers: {
                'x-access-token': this.props.accessToken,
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    editExercise(id, name, duration, date, calories) {
        // make a put request to the http://cs571.cs.wisc.edu:5000/activities/id/
        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/' + id + '/', {
            method: 'PUT',
            headers: {
                'x-access-token': this.props.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                duration: duration,
                date: date,
                calories: calories
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidUpdate() {
        var activitiesList

        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/', {
            method: 'GET',
            headers: {
              "x-access-token": this.props.accessToken
            }
        })
    
        .then((response) => response.json())
        .then((responseJson) => {
            activitiesList = (responseJson.activities)
            
            // sort the activities by date
            activitiesList.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })

            this.setState({
                exercises: activitiesList
            })
        })

    }
    

    componentDidMount() {
        var activitiesList

        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/', {
            method: 'GET',
            headers: {
              "x-access-token": this.props.accessToken
            }
        })
    
        .then((response) => response.json())
        .then((responseJson) => {
            activitiesList = (responseJson.activities)
            
            // sort the activities by date
            activitiesList.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })

            this.setState({
                exercises: activitiesList
            })
        })
    }

    // open a modal to create an exercise
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    createExercise() {
    
    }

    render() {
        return (
            <ScrollView>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {}}>
                    <ExerciseAddModalView
                        toggleModal={() => this.toggleModal()}
                        accessToken={this.props.accessToken}
                        addExercise={this.props.addExercise}
                    />

                </Modal>

                <View style={{  flexDirection: 'column', justifyContent: "space-between", alignItems: "center" }}>
                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                        <Icon 
                            name="walk-outline" 
                            color={"tomato"} 
                            size={33} 
                            style={{width: "15%"}}
                        />
                        <Text style={{ fontSize: 33, fontWeight: 'bold' }}>Add</Text>
                    </View>
                    <View style={styles.space}></View>
                    <Text>Let's get to work!</Text>
                    <View style={styles.smallSpace}></View>
                    <Text>Add Your Exercises Below</Text>
                    <View style={styles.smallSpace}></View>
                    <Button
                        title="Add Exercise"
                        color="tomato"
                        onPress={() => this.toggleModal()}
                    />

                    {this.state.exercises.length > 0  ?
                        this.state.exercises.map((exercise, index) => {
                                
                            <Text style={{ fontSize: 20 }}>{this.state.exercises.length}</Text>
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                                    <ExerciseView
                                        exercise={exercise}
                                        deleteExercise={this.deleteExercise.bind(this)}
                                        showEdit={true}
                                        editExercise={this.editExercise.bind(this)}
                                        toggleModal={() =>this.setState({ showModal: !this.state.showModal })}
                                    />
                                </View>
                            )
                        }) :
                        <Text style={{ fontSize: 20 }}></Text>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    smallSpace: {
        height: 10
    },

    space: {
        width: 20, // or whatever size you need
        height: 20,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginTop: 30,
    },
});


export default ExerciseList;