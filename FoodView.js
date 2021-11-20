import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-elements";

class FoodView extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <Card>
            <Text>Name: {this.props.food.name}</Text>
            <View style={styles.space}></View>
            <Text>Measure: {this.props.food.measure}</Text>
            <View style={styles.space}></View>
            <Text>Calories: {this.props.food.calories}</Text>
            <View style={styles.space}></View>
            <Text>Protein: {this.props.food.protein}</Text>
            <View style={styles.space}></View>
            <Text>Carbs: {this.props.food.carbohydrates}</Text>
            <View style={styles.space}></View>
            <Text>Fat: {this.props.food.fat}</Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
    scrollView: {
      height: Dimensions.get("window").height,
    },

    mainContainer: {
      flex: 1,
    },

    container: {
      flex: 1,
      backgroundColor: "#fff",
    },

    bigText: {
      fontSize: 32,
      fontWeight: "700",
      marginBottom: 5,
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

    buttonInline: {
      display: "flex",
      margin: 5,
      padding: 10,
    },

    input: {
      width: 200,
      padding: 10,
      margin: 5,
      height: 40,
      borderColor: "tomato",
      borderWidth: 1,
    },

    inputInline: {
      flexDirection: "row",
      display: "flex",
      width: 200,
      padding: 10,
      margin: 5,
      height: 40,
      borderColor: "tomato",
      borderWidth: 1,
    },

    bottomButtons: {
      flexDirection: "row",
      display: "flex",
      margin: 5,
    },
});

export default FoodView