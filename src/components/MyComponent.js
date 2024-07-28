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

    handlOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnsubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                my name Is {this.state.name} and I'm from {this.state.age}
                <form  onSubmit={(event) => this.handleOnsubmit(event)} >
                    <input type="text"
                        onChange={(event) => this.handlOnChangeInput(event)}
                    />
                    <button>Sumit</button>
                </form>
            </div>
        );
    }
}

export default Mycomponets;
