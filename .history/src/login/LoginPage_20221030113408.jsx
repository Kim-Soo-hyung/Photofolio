import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"

const LoginPage = () => {
 
    
  return (
    <div>
  <Route path="/login/form" component={LoginForm}/>
  <Route path="/login/register" component={LoginRegister}/>
  </div>
  )
}

export default LoginPage