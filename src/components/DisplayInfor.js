import React from "react";
import './DisplayInfor.scss'

// class DisplayInfor extends React.Component {

//     state = {
//         isShowListUser: true
//     }



//     componentDidUpdate() {
//         console.log(">>> call me componet did update")
//     }

//     render() {

//         const { listUser } = this.props;
//         return (
//             <div className="display-infor-containet">
//                 {true &&
//                     <>
//                         {listUser.map((user, index) => {

//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                     <div>My name's {user.name}</div>
//                                     <div>My age's {user.age}</div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {

    const { listUser } = props;
    return (
        <div className="display-infor-containet">
            {true &&
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