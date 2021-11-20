import React from 'react';
import { Card } from "react-native-elements"
import { StyleSheet, Text, View, Button } from 'react-native';
import FoodView from './FoodView';

class MealExtraDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: this.props.meal,
            foodItems: []
        }
    }

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


    componentDidMount() {
        fetch("http://cs571.cs.wisc.edu:5000/meals/" + this.state.meal.id + "/foods", {
            method: "GET",
            headers: {
              "x-access-token": this.props.accessToken,
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
          this.setState({
            foodItems: responseJson.foods
          })
        })  
    }

    render() {
        return (
            <View>
                <Card title={this.state.meal.name}>

                    <Text style={{ fontWeight: "bold", fontSize: 30 }}> {this.state.meal.name}</Text>

                    <View style={styles.space}></View>
                    <Text>Date {this.formatDate(this.state.meal.date)}</Text>

                    <Text>Foods</Text>
                    <View style={styles.space}></View>
                    {this.state.foodItems.map((item, index) => {
                        return (
                            <>
                                <FoodView food={item} key={Math.random() * Math.random()} />
                            </>
                        )
                    }
                    )}
                </Card>
                <View style={styles.space}></View>
                <View style={styles.space}></View>
                <View style={styles.space}></View>

                <Button title="Close" onPress={() => this.props.onPress()}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
    
});

export default MealExtraDetail;