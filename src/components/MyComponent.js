import React from "react";

class Mycomponets extends React.Component {
    state = {
        name: " Hoang",
        address: "Ha Noi",
        age: 26,
    };

    handlClick = (event) => {
        // console.log("??? Click me")
        console.log("my nmae is", Math.floor(Math.random() * 100 + 1));

        this.setState({
            name: "Viet",
        });
        this.setState({
            age: Math.floor(Math.random() * 100 + 1),
        });
    };

    handlOnMoveOver(event) {
        console.log(event);
    }

    render() {
        return (
            <div>
                my name Is{this.state.name} and I'm from {this.state.age}
                <button onMouseOver={this.handlOnMoveOver}>Click ove me</button>
                <button onClick={this.handlClick}>Click here</button>
            </div>
        );
    }
}

export default Mycomponets;
