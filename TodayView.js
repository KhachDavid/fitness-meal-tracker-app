import React from "react";
import { StyleSheet, Text, View, ScrollView, Modal, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import GoalStatus from "./GoalStatus";
import ExerciseView from "./ExerciseView";
import MealDetailView from "./MealDetailView";
import MealAddView from "./MealAddView";

class TodayView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dailyProgress: 0,
      dailyGoal: 0,
      todaysExercises: [],
      userMeals: [],
    };
  }

  //https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
  generateKey = () => {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  getExerciseById(id) {
    let ret;
    fetch("http://cs571.cs.wisc.edu:5000/activities/" + id, {
      method: "GET",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        ret = responseJson;
      });
    return ret;
  }

  getTodaysActivities(activitiesList) {
    let today = new Date();
    let todayString =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let todaysActivities = activitiesList.filter((activity) => {
      return activity.date.split("T")[0] === todayString;
    });
    return todaysActivities;
  }

  componentDidUpdate() {
    var activitiesList;

    fetch("http://cs571.cs.wisc.edu:5000/" + "activities/", {
      method: "GET",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        activitiesList = this.getTodaysActivities(responseJson.activities);

        this.setState({
          dailyProgress: this.findTotalExerciseTime(activitiesList),
          todaysExercises: activitiesList,
        });
      });

    //fetch("http://cs571.cs.wisc.edu:5000/meals/", {
    //  method: "GET",
    //  headers: {
    //    "x-access-token": this.props.accessToken,
    //  },
    //})
    //  .then((response) => response.json())
    //  .then((data) => {
    //    this.setState({ userMeals: this.getTodaysActivities(data.meals) });
    //  });
  }

  componentDidMount() {
    var activitiesList;

    fetch("http://cs571.cs.wisc.edu:5000/" + "activities/", {
      method: "GET",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        activitiesList = this.getTodaysActivities(responseJson.activities);

        this.setState({
          dailyProgress: this.findTotalExerciseTime(activitiesList),
          todaysExercises: activitiesList,
        });
      });

    fetch("http://cs571.cs.wisc.edu:5000/meals/", {
      method: "GET",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userMeals: this.getTodaysActivities(data.meals) });
      });
  }
  
  

  findTotalExerciseTime(exercises) {
    let totalTime = 0;
    exercises.forEach((exercise) => {
      totalTime += exercise.duration;
    });

    return totalTime;
  }

  // delete exercise given the id of the exercise make a delete request to the http://cs571.cs.wisc.edu:5000/
  deleteExercise(id) {
    // remove the exercise from the state array that has the given id
    let newExercises = this.state.todaysExercises.filter((exercise) => {
      return exercise.id !== id;
    });

    if (id === this.props.recentExercise.id) {
      this.props.removeRecentExercise();
    }

    // update the state with the new array
    this.setState({
      dailyProgress: this.findTotalExerciseTime(newExercises),
      todaysExercises: newExercises,
    });

    fetch("http://cs571.cs.wisc.edu:5000/" + "activities/" + id + "/", {
      method: "DELETE",
      headers: {
        "x-access-token": this.props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.space}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="settings-outline"
              color={"tomato"}
              size={33}
              style={{ width: "15%" }}
            ></Icon>
            <Text style={{ fontSize: 33 }}>Today</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <GoalStatus
              dailyGoal={this.props.dailyGoal}
              dailyProgress={this.state.dailyProgress}
            />
          </View>
          <View style={styles.space}></View>
          <View style={styles.space}></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="bicycle-outline"
              color={"tomato"}
              size={33}
              style={{ width: "15%" }}
            ></Icon>
            <Text style={{ fontSize: 33 }}>Exercises</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            {this.state.todaysExercises.length > 0 ? (
              this.state.todaysExercises.map((exercise, index) => {
                <Text style={{ fontSize: 20 }}>
                  {this.state.todaysExercises.length}
                </Text>;
                return (
                  <View
                    key={Math.random() * Math.random()}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ExerciseView
                      exercise={exercise}
                      deleteExercise={this.deleteExercise.bind(this)}
                      showEdit={false}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={{ fontSize: 20 }}></Text>
            )}
          </View>

          <View style={styles.space}></View>
          <View style={styles.space}></View>
          <View style={styles.space}></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="restaurant-outline"
              color={"tomato"}
              size={33}
              style={{ width: "15%" }}
            ></Icon>
            <Text style={{ fontSize: 33 }}>Meals</Text>
          </View>
          <View style={styles.space}></View>

          <View >
            <View style={styles.space}></View>
            <View style={styles.space}></View>
            {this.state.userMeals.map((meal, index) => (
              <>
                <MealDetailView
                  key={Math.random() * Math.random()}
                  meal={meal}
                  accessToken={this.props.accessToken}
                />
              </>
            ))}
            <View style={styles.space}></View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

export default TodayView;
