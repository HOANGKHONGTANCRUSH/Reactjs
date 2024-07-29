import React from "react";

class DisplayInfor extends React.Component {
    render() {

        const {listUser} = this.props;
        console.log(listUser)
        console.log(this.props)
        return (
            <div>
                {listUser.map((user, index) => {
                    return(
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                        </div>
                    )
                })}
                {/* <div>My name's {listUser}</div>
                <div>My age's {listUser}</div> */}
            </div>
        )
    }
}

export default DisplayInfor;