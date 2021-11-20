import React from "react";
import { Card } from "react-native-elements";
import { View, Text, Modal, Button } from "react-native";
import MealExtraDetail from "./MealExtraDetail";

class MealDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.meal.name,
      date: this.props.meal.date,
      id: this.props.meal.id,
      foodItems: [],
      totalCalories: 0,
      totalFats: 0,
      totalCarbs: 0,
      totalProtein: 0,
      disableButton: false,
      showExtraDetail: false
    };
  }

  delete() {

    fetch("http://cs571.cs.wisc.edu:5000/meals/" + this.state.id, {
      method: "DELETE",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        alert("Meal Deleted! It will take some time reflect the change");
        this.setState({
          disableButton: true
        })
      });
  }

  toggleShowExtraDetail() {
    this.setState({
      showExtraDetail: !this.state.showExtraDetail
    });
  }

  componentDidMount() {
    this.getFoodItems();
    //this.getTotalCalories();
  }

  componentDidUpdate() {}

  getFoodItems() {
    fetch("http://cs571.cs.wisc.edu:5000/meals/" + this.state.id + "/foods", {
      method: "GET",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let totalCalories = this.getTotalCalories(responseJson.foods);
        let totalProtein = this.getTotalProtein(responseJson.foods);
        let totalCarbs = this.getTotalCarbs(responseJson.foods);
        let totalFat = this.getTotalFat(responseJson.foods);

        this.setState({
          foodItems: responseJson,
          // total calories in responseJson
          totalCalories: totalCalories,
          totalProtein: totalProtein,
          totalCarbs: totalCarbs,
          totalFat: totalFat
        });
      });
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

    return (
      month + "/" + day + "/" + year + " - " + hour + ":" + minute + " " + ampm
    );
  }

  // loop over all food items and add up the calories
  // set the state of totalCalories to the sum of all calories
  // return the totalCalories
  getTotalCalories(foods) {

    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += food.calories;
    });
    return totalCalories
  }

  //get total protein, carbs, fat, 
  //get total calories
  //get total fat
  //get total carbs
  //get total protein
  getTotalProtein(foods) {
    let totalProtein = 0;
    foods.forEach((food) => {
      totalProtein += food.protein;
    });
    return totalProtein;
  }

  getTotalCarbs(foods) {
    let totalCarbs = 0;
    foods.forEach((food) => {
      totalCarbs += food.carbohydrates;
    });
    return totalCarbs;
  }

  getTotalFat(foods) {
    let totalFat = 0;
    foods.forEach((food) => {
      totalFat += food.fat;
    });
    return totalFat;
  }

  render() {
    return (
      <>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showExtraDetail}
          onRequestClose={() => {}}
        >
          <MealExtraDetail
            toggleMealExtraDetailView={() => this.toggleShowExtraDetailView()}
            accessToken={this.props.accessToken}
            meal={this.props.meal}
            onPress={() => this.toggleShowExtraDetail()}
          />
        </Modal>

        <Card onPress={this.props.onPress}>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Divider />
          <View>
            <Text>{this.formatDate(this.state.date)}</Text>
          </View>

          <Card.Divider />
          <View>
            <Text>Calories {this.state.totalCalories}</Text>
          </View>

          <Card.Divider />
          <View>
            <Text>Protein {this.state.totalProtein}</Text>
          </View>
          
          <Card.Divider />
          <View>
            <Text>Fats {this.state.totalFats}</Text>
          </View>
          
          <Card.Divider />
          <View>
            <Text>Carbs {this.state.totalCarbs}</Text>
          </View>


          <Card.Divider />
          <Button title="See More" onPress={this.toggleShowExtraDetail.bind(this)}></Button>

          {this.state.disableButton ? (
            <Button title="Delete" onPress={this.delete.bind(this)} disabled></Button>
          ) : (
            <Button title="Delete" onPress={this.delete.bind(this)}></Button>

            )}
       


        </Card>
      </>
    );
  }
}

export default MealDetailView;
