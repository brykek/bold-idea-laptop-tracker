import './Login.css';

export default function Login() {

  return(
    <form className='loginForm'>
        <h2>Log Into Your Account</h2>
      <label>
        <p>Username</p>
        <input type="text"/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      <div>
        <p><a className='forgot' href='https://www.login.gov/help/trouble-signing-in/forgot-your-password/'>Forgot your password?</a></p>
      </div>
    </form>
  )
}
