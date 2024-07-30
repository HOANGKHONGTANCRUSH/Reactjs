import React from "react";
import './DisplayInfor.scss'
import logo from './../logo.svg'

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }


    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {

        const { listUser } = this.props;
        console.log(listUser)
        console.log(this.props)
        return (
            <div className="display-infor-containet">
                <img src={logo} />
                <div>
                    <span onClick={() => { this.handleShowHide() }}>{this.state.isShowListUser === true ? "Hide List user" : "Show List user"} </span>
                </div>
                {this.state.isShowListUser &&

                    <div>
                        {listUser.map((user, index) => {
                            console.log("check >>>", user)

                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor;