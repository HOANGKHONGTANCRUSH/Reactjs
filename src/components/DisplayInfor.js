import React, { useEffect, useState } from "react";
import './DisplayInfor.scss'


const DisplayInfor = (props) => {

    const { listUser } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handlShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser);
    }

    console.log(">> call me render")

    useEffect(

        () => {
            if (listUser.length === 0) {
                alert("oooo")
            }
            console.log(">> call me useEffect")

        }
        , [listUser])

    return (
        <div className="display-infor-containet">
            <div>
                <span onClick={() => handlShowHideListUser()}>{isShowHideListUser === true ? "Hide List User " : "Show List User"}</span>
            </div>
            {isShowHideListUser &&
                <>
                    {listUser.map((user, index) => {

                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>My name's {user.name}</div>
                                <div>My age's {user.age}</div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default DisplayInfor;