import React from "react";
import FoodAddView from "./FoodAddView";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import FoodView from "./FoodView";

class MealAddView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: new Date(),
      showDate: false,
      showAddFoodModal: false,
      mode: "date",
      foodItems: [],
    };
  }

  //https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
  generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }


  addMeal() {
    let newMealId;

    // make a fetch request to add the meal 571 api
    fetch("http://cs571.cs.wisc.edu:5000/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.accessToken,
      },
      body: JSON.stringify({
        name: this.state.name,
        date: this.swapAmPm(this.state.date),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        newMealId = responseJson.id;
        this.state.foodItems.forEach((foodItem) => {
            fetch("http://cs571.cs.wisc.edu:5000/meals/" + newMealId + "/foods", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": this.props.accessToken,
              },
              body: JSON.stringify({
                name: foodItem.name,
                calories: foodItem.calories,
                carbohydrates: foodItem.carbohydrates,
                protein: foodItem.protein,
                fat: foodItem.fat,
                measure: foodItem.measure,
              }),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
            });
        });
        this.props.toggleMealAddView()
        alert("Meal added successfully!");
      
      });

    // make a fetch request to add the food 571 api
  }

  swapAmPm(time) {
    // convert time from london to user timezone
    var timezoneOffset = new Date().getTimezoneOffset() * 60000;
    var localISOTime = new Date(time.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, -1);
    var localTime = new Date(localISOTime);
    let date = localTime;

    // get year
    let year = date.getFullYear();

    // get month
    let month = date.getMonth() + 1;

    // get day
    let day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime =
      year + "-" + month + "-" + day + "T" + hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  showDatepicker() {
    this.setState({ showDate: true, mode: "date" });
  }

  showTimepicker() {
    this.setState({ showDate: true, mode: "time" });
  }

  toggleFoodModal() {
    this.setState({ showAddFoodModal: !this.state.showAddFoodModal });
  }

  onChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    this.setState({
      showDate: Platform.OS === "ios",
      date: currentDate,
    });
  }

  addFood(state) {
    this.setState({
      foodItems: [...this.state.foodItems, state],
    }),
    this.toggleFoodModal();
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <View style={styles.space}></View>
        <View style={styles.space}></View>
        <View style={styles.space}></View>
        <ScrollView >
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showAddFoodModal}
            onRequestClose={() => {}}
          >
            <FoodAddView
              toggleAddFoodModal={() => this.toggleFoodModal()}
              accessToken={this.props.accessToken}
              addFood={this.addFood.bind(this)}
            />
          </Modal>

          <Button
            title="Close"
            onPress={() => {
              this.props.toggleMealAddView();
            }}
          ></Button>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Breakfast"
            placeholderTextColor="#d9bebd"
            onChangeText={(name) => this.setState({ name: name })}
            value={this.state.name}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>

          {/* Loop over foodItems */}
          {this.state.foodItems.map((foodItem, index) => {
            return <FoodView key={foodItem} food={foodItem} />;
          })}
          <View style={styles.space}></View>
          <Button onPress={this.toggleFoodModal.bind(this)} title="Add Food" />

          <View style={styles.space}></View>

          <View>
            <Button
              onPress={this.showDatepicker.bind(this)}
              title="Show date picker!"
            />
          </View>
          <View>
            <Button
              onPress={this.showTimepicker.bind(this)}
              title="Show time picker!"
            />
          </View>

          <View styles={styles.space}></View>

          <View styles={styles.space}></View>
          <Button title="Submit" onPress={this.addMeal.bind(this)} />
        </ScrollView>

        <View style={{marginBottom: 60, marginRight: Dimensions.get("window").width / 2 + 20, display: "flex", justifyContent: "center"}}>
          {this.state.showDate && (
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
    );
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    alignItems: "center",
    alignSelf: "center",
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

export default MealAddView;
