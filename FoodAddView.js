import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Button,
  TextInput,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

class FoodAddView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      measure: "",
      protein: 0,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  // render with text input opportunity to add food state variables
  render() {
    // react native
    return (
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{
          flexGrow: 11,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardAwareScrollView>
          <Button
            title="Close"
            onPress={() => this.props.toggleAddFoodModal()}
          ></Button>
          <View style={styles.space}></View>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Hummus"
            placeholderTextColor="#d9bebd"
            onChangeText={(name) => this.setState({ name: name })}
            value={this.state.name}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <Text>Measure</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Slice"
            placeholderTextColor="#d9bebd"
            onChangeText={(measure) => this.setState({ measure: measure })}
            value={this.state.measure}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <Text>Fats</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="35"
            placeholderTextColor="#d9bebd"
            onChangeText={(fat) =>
              this.setState({
                fat: !fat ? 0 : parseFloat(fat),
              })
            }
            value={this.state.fat + ""}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <Text>Calories</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="35"
            placeholderTextColor="#d9bebd"
            onChangeText={(calories) =>
              this.setState({
                calories: !calories ? 0 : parseFloat(calories),
              })
            }
            value={this.state.calories + ""}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <Text>Carbs</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="35"
            placeholderTextColor="#d9bebd"
            onChangeText={(carbohydrates) =>
              this.setState({
                carbohydrates: !carbohydrates ? 0 : parseFloat(carbohydrates),
              })
            }
            value={this.state.carbohydrates + ""}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <Text>Protein</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="35"
            placeholderTextColor="#d9bebd"
            onChangeText={(protein) =>
              this.setState({
                protein: !protein ? 0 : parseFloat(protein),
              })
            }
            value={this.state.protein + ""}
            autoCapitalize="none"
          />

          <View style={styles.space}></View>
          <View style={styles.space}></View>

          <Button
            onPress={() => this.props.addFood(this.state)}
            title="Add Food"
            color="tomato"
          />
        </KeyboardAwareScrollView>
      </ScrollView>
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

export default FoodAddView;
