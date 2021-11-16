import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import base64 from "base-64";

class LoginView extends React.Component {
  constructor() {
    super();

    // Initializes username and password states which will be used for TextInputs
    this.state = {
      username: "",
      password: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /**
   * Sends a request to the `/login` endpoint.
   *
   * Stores accessToken if login was successful,
   * which will automatically navigate user to ProfileView (See authentication flow in App.js)
   *
   */
  handleLogin() {
    fetch("http://cs571.cs.wisc.edu:5000/login", {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          base64.encode(this.state.username + ":" + this.state.password), // Basic Authentication
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          // Login success, store username and accessToken using the callback function
          this.props.login(this.state.username, res.token);
        } else {
          // Login failure
          alert("Incorrect username or password! Please try again.");
        }
      });
  }

  /**
   * Handler for Signup button. Navigates user to SignupView.
   *
   */
  handleSignup() {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>FitnessTracker</Text>
        <Text>Welcome! Please login or signup to continue.</Text>
        <View style={styles.space} />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#992a20"
          onChangeText={(username) => this.setState({ username: username })}
          value={this.state.username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#992a20"
          onChangeText={(password) => this.setState({ password: password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <View style={styles.space} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Button
            color="#942a21"
            style={styles.buttonInline}
            title="Login"
            onPress={this.handleLogin}
          />
          <View style={styles.spaceHorizontal} />
          <Button
            color="#942a21"
            style={styles.buttonInline}
            title="Signup"
            onPress={this.handleSignup}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5,
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
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: "#c9392c",
    borderWidth: 1,
  },
});

export default LoginView;
