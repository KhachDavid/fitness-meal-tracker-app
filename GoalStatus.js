import React from "react";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { View, Text, Image, StyleSheet } from 'react-native'


class GoalStatus extends React.Component {
    constructor(props) {
      super(props);
    }

    // render goals status which is a card that shows the prop out of the goal react native
    render() {
        return (
            <Card>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20, textAlignVertical: "auto", marginLeft: "auto", marginRight: "auto"}}>Goal Status</Text>
                </View>
                <View style={styles.space}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Daily Acitivity: {this.props.dailyProgress}/{this.props.dailyGoal} mins</Text>
                </View>
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },

    spaceSmall: {
        width: 20, // or whatever size you need
        height: 10,
    },

    spaceHorizontal: {
        display: "flex",
        width: 20,
    },
});


export default GoalStatus;