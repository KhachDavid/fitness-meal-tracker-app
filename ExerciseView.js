import React from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";
import { Card } from "react-native-elements";
import ExerciseAddModalView from "./ExerciseAddModalView";

class ExerciseView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    // divide the string type date into a readable format
    formatDate(date) {
        let dateArray = date.split("T");
        let dateString = dateArray[0];
        let timeString = dateArray[1];
        let timeArray = timeString.split(":");
        let hour = timeArray[0];
        let minute = timeArray[1];
        let second = timeArray[2];
        let ampm = "AM";
        if (hour > 12) {
            hour = hour - 12;
            ampm = "PM";
        }
        if (hour == 0) {
            hour = 12;
        }
        if (second < 10) {
            second = "0" + second;
        }   

        let splitDate = dateString.split("-");
        let year = splitDate[0];
        let month = splitDate[1];
        let day = splitDate[2];

        return (month + "/" + day + "/" + year + " - " + hour + ":" + minute +  " " + ampm)

    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    // an exercise has calories burned, duration, date and a name
    render() {
        return (
            <Card>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.exercise.name}</Text>
                    <Text style={styles.text}>{this.props.exercise.calories} calories burned</Text>
                    <Text style={styles.text}>{this.props.exercise.duration} minutes</Text>

                    {/* Format the date */}
                    
                    <Text style={styles.text}>{this.formatDate(this.props.exercise.date)}</Text>

                    {this.props.showEdit && (
                        <>
                            <Modal
                                animationType={'slide'}
                                transparent={false}
                                visible={this.state.showModal}
                                onRequestClose={() => {}}>
                                <ExerciseAddModalView
                                    accessToken={this.props.accessToken}
                                    addExercise={this.props.addExercise}
                                    toggleModal={this.toggleModal.bind(this)}
                                    editExercise={this.props.editExercise}
                                    editMode={true}
                                    exercise={this.props.exercise}
                                />
                            </Modal>

                            <>
                                <Button
                                    title="Edit"
                                    onPress={() => this.setState({ showModal: true })}
                                /> 
                                <View style={styles.space}></View>
                            </>
                        </>
                    )} 

                    <Button
                        title="Delete"
                        onPress={() => this.props.deleteExercise(this.props.exercise.id)}
                    /> 

                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        margin: 10,
    },

    space: {
        width: 20,
        height: 20,
    },

    smallSpace: {
        width: 10,
        height: 10,

    }
});

export default ExerciseView;