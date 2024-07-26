import React from "react";


class Mycomponets extends React.Component{
    
    state = {
        name : ' Hoang',
        address: 'Ha Noi',
        age: 26
    };

    handlClick(event){
        // console.log("??? Click me")
        console.log("my nmae is", this.state.name)
    }

    handlOnMoveOver(event) {
        console.log(event)
    }

    render(){
        return (
            <div>
                my name Is{this.state.name} and I'm from {this.state.address}
                <button onMouseOver={this.handlOnMoveOver}>Click ove me</button>
                <button onClick={this.handlClick}>Click here</button>
            </div>
        );
    }
}

export default Mycomponets;