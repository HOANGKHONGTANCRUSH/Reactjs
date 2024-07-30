import React from "react";
import AddUserinfor from "./AddUserinfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponets extends React.Component {

    state = {
        listUser: [
            { id: 1, name: "hoang", age: "39" },
            { id: 2, name: "niec", age: "98" },
            { id: 3, name: "wow", age: "3" },
        ]
    }

    handleAddNewUser = (userObj) => {

        this.setState({
            listUser: [userObj, ...this.state.listUser]
        })
    }
    handleDeleteUser = (userId) => {
        let listUserClone = this.state.listUser
        listUserClone = listUserClone.filter(item => item.id !== userId)
        this.setState({
            listUser: listUserClone
        })

    }

    render() {

        return (
            <>
                <div>
                    <AddUserinfor
                        handleAddNewUser={this.handleAddNewUser}
                    />
                    <br></br>
                    <DisplayInfor listUser={this.state.listUser}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </div>
            </>
        );
    }
}

export default Mycomponets;
