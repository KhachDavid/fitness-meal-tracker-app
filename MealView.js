import { StylesContext } from "@material-ui/core/node_modules/@material-ui/styles";
import React from "react";
import { Text, View, StyleSheet, ScrollView, Modal, Button } from "react-native";
import { ListItem } from "react-native-elements";
import MealAddView from "./MealAddView";
import MealExtraDetail from "./MealExtraDetail";
import MealDetailView from "./MealDetailView";

class MealView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMeals: [],
            showMealAdd: false,
            rerender: false,
        }
    }

    generateKey = (pre) => {
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
    

    toggleMealAddView() {
        this.setState({showMealAdd: !this.state.showMealAdd})
    }
    
    toggleMealExtraDetailView() {
        this.setState({showExtraDetail: !this.state.showExtraDetail})
    }

    componentDidMount() {
        fetch('http://cs571.cs.wisc.edu:5000/meals/', {
            method: 'GET',
            headers: {
                'x-access-token': this.props.accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({userMeals: data.meals})
        })
    }

    componentDidUpdate() {
        fetch('http://cs571.cs.wisc.edu:5000/meals/', {
            method: 'GET',
            headers: {
                'x-access-token': this.props.accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({userMeals: data.meals})
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showMealAdd}
                        onRequestClose={() => {}}>
                        <MealAddView
                            toggleMealAddView={() => this.toggleMealAddView()}
                            accessToken={this.props.accessToken}
                        />
                    </Modal>
                    <View style={styles.space}></View>
                    <Button title="Add A Meal" onPress={this.toggleMealAddView.bind(this)}></Button>
                    <View style={styles.space}></View>
                    {this.state.userMeals.reverse().map((meal, index) => (
                        <>
                            <MealDetailView
                                key={meal}
                                meal={meal}
                                accessToken={this.props.accessToken}
                            />
                        </>
                    ))}
                    <View style={styles.space}></View>
                    <Button title="Add A Meal" onPress={this.toggleMealAddView.bind(this)}></Button>
                </View>
            </ScrollView>
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
        width: 20,
        height: 20,
    }
});

export default MealView;