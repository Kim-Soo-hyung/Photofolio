import { Route } from "react-router-dom"
import LoginFindId from "./LoginFindId"
import LoginFindPass from "./LoginFindPass"
import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"
import LoginRestore from "./LoginRestore"
import LoginUpdatePass from "./LoginUpdatePass"

const LoginPage = () => {


  return (
    <div>
      <Route path="/login/form" component={LoginForm} />
      <Route path="/login/register" component={LoginRegister} />
      <Route path="/login/restore/:uid" component={LoginRestore}/>
      <Route path="/login/findpass" component={LoginFindPass}/>
      <Route path="/login/findid" component={LoginFindId}/>
      <Route path="/login/updatepass" component={LoginUpdatePass}/>
    </div>
  )
}

export default LoginPage