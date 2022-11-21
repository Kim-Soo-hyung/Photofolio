import { Route } from "react-router-dom"
import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"
import LoginRestore from "./LoginRestore"

const LoginPage = () => {


  return (
    <div>
      <Route path="/login/form" component={LoginForm} />
      <Route path="/login/register" component={LoginRegister} />
      <Route path="/login/restore" component={LoginRestore}/>
    </div>
  )
}

export default LoginPage