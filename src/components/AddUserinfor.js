import React from "react";

class AddUserinfor extends React.Component {

    state = {
        name: " ",
        address: " ",
        age: "",
    };
    handlOnMoveOver(event) {
        console.log(event);
    }

    handlOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handlOnChangeage = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnsubmit = (event) => {
        event.preventDefault();
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-Random",
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <div>
                my name Is {this.state.name} and I'm from {this.state.age}
                <form onSubmit={(event) => this.handleOnsubmit(event)} >
                    <label>Your Name :</label>
                    <input type="text"
                        value={this.state.name}
                        onChange={(event) => this.handlOnChangeInput(event)}
                    />
                    <button>Sumit</button>

                    <label>Your Age :</label>
                    <input type="text"
                        value={this.state.age}
                        onChange={(event) => this.handlOnChangeage(event)}
                    />
                    <button>Sumit</button>
                </form>
            </div>
        )
    }
}

export default AddUserinfor;