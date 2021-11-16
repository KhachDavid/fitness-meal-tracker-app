import React from "react";

import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      accessToken: undefined,
      username: undefined,
    };

    this.login = this.login.bind(this);
    this.revokeAccessToken = this.revokeAccessToken.bind(this);
  }

  /**
   * A callback function to store username and accessToken in the state
   * This callback function is passed to `LoginView`
   *
   * @param {string} username
   * @param {string} accessToken
   */
  login(username, accessToken) {
    this.setState({
      username: username,
      accessToken: accessToken,
    });
  }

  /**
   * Revokes the access token in the state, so that the user is logged out
   *
   */
  revokeAccessToken() {
    this.setState({
      accessToken: undefined,
    });
  }

  /**
   * Defines a stack navigator for three screens, LoginView, SignupView, and ProfileView.
   *
   * We define the navigator to show only LoginView and SignupView if user is not logged in ('this.state.accessToken' does not exist)
   * and show ProfileView if the user is logged in (this.state.accessToken exists)
   *
   * See https://reactnavigation.org/docs/auth-flow/ for more details on the authentication flow.
   *
   * @returns `NavigationContainer`
   */
  render() {
    const AuthStack = createStackNavigator();

    return (
      <NavigationContainer>
        <AuthStack.Navigator>
          {!this.state.accessToken ? (
            <>
              <AuthStack.Screen
                name="SignIn"
                options={{
                  title: "Fitness Tracker Welcome",
                }}
              >
                {(props) => <LoginView {...props} login={this.login} />}
              </AuthStack.Screen>
              <AuthStack.Screen
                name="SignUp"
                options={{
                  title: "Fitness Tracker Signup",
                }}
              >
                {(props) => <SignupView {...props} />}
              </AuthStack.Screen>
            </>
          ) : (
            <AuthStack.Screen
              name="FitnessTracker"
              options={{
                title: "Fitness Tracker",
              }}
            >
              {(props) => (
                <ProfileView
                  {...props}
                  username={this.state.username}
                  accessToken={this.state.accessToken}
                  revokeAccessToken={this.revokeAccessToken}
                />
              )}
            </AuthStack.Screen>
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
