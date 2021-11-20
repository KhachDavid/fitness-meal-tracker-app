import React from "react";
import { 
    View, 
    Text, 
    Button, 
    StyleSheet, 
    TextInput,
    Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThreeSixty } from "@material-ui/icons";


class ExerciseAddModalView extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.exercise === undefined) {
            this.state = {
                name: '',
                duration: '',
                caloriesBurned: '',
                date: new Date(),
                show: false,
                mode: 'date'
            }
        }
        else {
            this.state = {
                name: this.props.exercise.name,
                duration: this.props.exercise.duration,
                caloriesBurned: this.props.exercise.calories,
                date: new Date(this.props.exercise.date),
                show: false,
                mode: 'date'
            }
        }
    }

    componentDidMount() {

    }

    showDatepicker() {
        this.setState({ show: true, mode: 'date' });
    };
    
    showTimepicker() {
        this.setState({ show: true, mode: 'time' });
    };


    onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        this.setState({
            show: Platform.OS === 'ios',
            date: currentDate
        });
    }

    updateInfo() {
        console.log("Updating info");
        let name = (this.state.name);
        let duration = (this.state.duration);
        let caloriesBurned = (this.state.caloriesBurned);
        let date = (this.swapAmPm(this.state.date));

        // post to 571 API 
        fetch('http://cs571.cs.wisc.edu:5000/' + 'activities/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'x-access-token': this.props.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "duration": duration,
                "calories": caloriesBurned,
                "date": date,
                
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert("Exercise added successfully!");
            this.props.toggleModal()
            this.props.addExercise(name, duration, caloriesBurned, date, responseJson.id)
        })
        .catch((error) => {
            console.error(error);
        });

    }

    // convert given time from London to user timezone
    // swap am/pm
    swapAmPm(time) {
        // convert time from london to user timezone
        var timezoneOffset = new Date().getTimezoneOffset() * 60000;
        var localISOTime = new Date(time.getTime() - timezoneOffset).toISOString().slice(0, -1);
        var localTime = new Date(localISOTime);
        let date = localTime 


        // get year
        let year = date.getFullYear();

        // get month
        let month = date.getMonth() + 1;

        // get day
        let day = date.getDate();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = year + "-" + month + "-" + day + "T" + hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    updateDetails() {
        this.props.toggleModal()
        this.props.editExercise(this.props.exercise.id, this.state.name, this.state.duration, this.swapAmPm(this.state.date), this.state.caloriesBurned)
    }

    render() {
        return (
            <>
                <View style={styles.modal}>
                    <Text style={styles.text}>Exercise Details</Text>

                    <Button
                      title="Close"
                      color="tomato"
                      onPress={() => {
                        this.props.toggleModal();
                      }}
                    />
                    {/* Add space */}
                    <View style={styles.space} />
                    <Text style={styles.bold}> Exercise Name </Text>
                    <TextInput
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="Jogging"
                      placeholderTextColor="#d9bebd"
                      onChangeText={(name) =>
                        this.setState({
                          name: name
                        })
                      }
                      value={this.state.name + ""}
                      autoCapitalize="none"
                    />

                    <View style={styles.space} />
                    <Text style={styles.bold}> Duration (minutes) </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="30"
                        placeholderTextColor="#d9bebd"
                        onChangeText={(duration) =>
                          this.setState({
                            duration: !duration
                              ? 0
                              : parseFloat(duration),
                          })
                        }
                        value={this.state.duration + ""}
                        autoCapitalize="none"
                    />

                    <View style={styles.space} />
                    <Text style={styles.bold}> Calories Burned </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="30"
                        placeholderTextColor="#d9bebd"
                        onChangeText={(caloriesBurned) =>
                          this.setState({
                            caloriesBurned: !caloriesBurned
                              ? 0
                              : parseFloat(caloriesBurned),
                          })
                        }
                        value={this.state.caloriesBurned + ""}
                        autoCapitalize="none"
                    />

                    <View style={styles.space} />
                    <Text style={styles.bold}> Exercise Date and Time </Text>
                <View>
                  <Button onPress={this.showDatepicker.bind(this)} title="Show date picker!" />
                </View>
                <View>
                  <Button onPress={this.showTimepicker.bind(this)} title="Show time picker!" />
                </View>
                
                <View style={styles.space}></View>
                
                {this.props.editMode ? (
                    <Button onPress={this.updateDetails.bind(this)} title="Save" color="tomato"/>
                ) : (
                    <Button onPress={this.updateInfo.bind(this)} title="Save" color="tomato"/>
                )}
                </View>
                
                <View style={{ marginBottom: "20%" }} >
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange.bind(this)}
                  />
                )}
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 100,
    },

    text: {
        color: '#3f2949',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },

    spaceSmall: {
        width: 20, // or whatever size you need
        height: 10,
    },
    
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
    
    spaceHorizontal: {
        display: "flex",
        width: 20,
    },

    input: {
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: "tomato",
        borderWidth: 1,
    },

    bold: {
        fontWeight: 'bold',
    }
});

export default ExerciseAddModalView
