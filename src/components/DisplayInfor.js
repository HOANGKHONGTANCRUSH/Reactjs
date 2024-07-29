import React from "react";

class DisplayInfor extends React.Component {
    render() {

        const {age, name} = this.props;
        console.log(this.props)
        return (
            <div>
                <div>My name's {name}</div>
                <div>My age's {age}</div>
            </div>
        )
    }
}

export default DisplayInfor;