import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponets extends React.Component {


    render() {
        const myInfor = ["ab", "ac"]
        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <DisplayInfor name="Hoang" age = " 23" />
                <DisplayInfor name="Hoang" age = " 23" />
                <DisplayInfor name="o" age = " 3" />
                <DisplayInfor name="Hoang" age = " 23" myInfor = {myInfor} />
            </div>
        );
    }
}

export default Mycomponets;
