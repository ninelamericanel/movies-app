import React, {Component} from "react";

type AppState = {

};

interface AppProp {}

export default class App extends Component<AppProp | AppState> {

    render() {
        return <h1>Movies</h1>
    }
}