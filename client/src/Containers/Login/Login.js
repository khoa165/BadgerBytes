import React,{Component} from 'react';

class Login extends Component{
    
    render(){
        let login=(
            <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form>
              <label>
                <p>Username</p>
                <input type="text" />
              </label>
              <label>
                <p>Password</p>
                <input type="password" />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        );

        return(
            <div>
                {login}
            </div>
        );
    }
}

export default Login;