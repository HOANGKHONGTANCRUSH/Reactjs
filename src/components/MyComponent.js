import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponets extends React.Component {

    state = {
        listUser: [
            { id: 1, name: "hoang", age: "39" },
            { id: 2, name: "niec", age: "98" },
            { id: 3, name: "wow", age: "3" },
        ]
    }

    render() {

        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <DisplayInfor listUser={this.state.listUser} />
            </div>
        );
    }
}

export default Mycomponets;
