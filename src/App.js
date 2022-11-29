import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
const auth = getAuth(app);


function App() {
const [validated, setValidated] = useState(false);
const [error,setError] = useState('');
const [register, setRegister] = useState(false);

  // const [userAc, setUserAc] = useState({})
  // const googleProvider = new GoogleAuthProvider();
  // const gitHubProvider = new GithubAuthProvider();

  // const handleGoogleSignIN=()=>{
  //   signInWithPopup(auth,googleProvider)
  //   .then(result=>{
  //     const user = result.user;
  //     setUserAc(user)
  //     console.log(user);
  //   })
  //   .catch(error=>{
  //     console.log('error', error);
  //   })
  // }
  // const handleSignUP=()=>{
  //   signOut(auth)
  //   .then(()=>{
  //     setUserAc([]);
  //   })
  //   .catch(error=>{
  //     setUserAc([]);
  //   })
  // }
  // const handleGithubSignIn=()=>{
  //   signInWithPopup(auth,gitHubProvider)
  //   .then(result=>{
  //     const user = result.user;
  //     setUserAc(user)
  //     console.log(user);
  //   })
  //   .catch(error=>{
  //     console.log('error', error);
  //   })
  // }
const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const [name, setName] = useState('');
const handleEmailBlur=(event)=>{
    setEmail(event.target.value);
}
const handleNameBlur=event=>{
  setName(event.target.value);
}
const handlePassBlur =(event)=>{
  setPassword(event.target.value);
}
const handleRegChange = event=>{
  setRegister(event.target.checked);
}

const submitHandle=(event)=>{
  
    // console.log('form submitted: ',email, password);
    const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      if(!/(?=.*[!@#$%^&*])/.test(password)){
        setError("Please add any single special character")
        return;
      }
      
      setValidated(true);
      setError('')
    
    if(register){
      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        console.log(result.user);
      })
      .catch(error=>{
        setError(error.message)
      })

    }else{
      createUserWithEmailAndPassword(auth,email, password)
    .then(result=>{
        console.log(result.user);
        setEmail('');
        setPassword('');
        setName('');
        emailVerify();
        userUpdate();
    })
    .catch(error=>{
      setError(error.message);
    })
    }
    event.preventDefault();
}

const emailVerify=()=>{
  sendEmailVerification(auth.currentUser)
  .then(()=>{
    console.log('Email Verify');
  })
}
const handlePasswordReset =()=>{
  sendPasswordResetEmail(auth, email)
  .then(()=>{
    console.log('send');
  })
}

const userUpdate=()=>{
  updateProfile(auth.currentUser,name)
  .then(()=>{
    console.log('name updated');
  })
  .catch(error=>{
    setError(error)
  })
}

  return (
    <div>
      <div className="registration">
        <Form noValidate validated={validated} onSubmit={submitHandle}>
          <h2 className='p-3 mb-2 bg-primary text-white'>Please {register?'Log In':'Register'}!!</h2>

          { !register && <Form.Group className="mb-3" controlId="formNameEmail">
            <Form.Label>User Full Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Full Name" required/>
            <Form.Control.Feedback type="invalid">
              Please Enter Your Full Name
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required/>
            <Form.Control.Feedback type="invalid">
              Please Enter a Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please choose a PassWord.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegChange} type="checkbox" label="Already Registered" />
          </Form.Group>

          <p className='test-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant='link'>Forget Password? </Button> <br />
          <Button variant="primary" type="submit">
            {register?'Log In':'Register' }
          </Button>
        </Form> 
      </div>
    </div>
  );
}

export default App;

// {
//   userAc.email?<button onClick={handleSignUP}>Sign Out</button>:
//   <>
//     <button onClick={handleGoogleSignIN}>Google sign in</button>
//     <button onClick={handleGithubSignIn}>GitHub SignIn</button>
//   </>
// }

// <br /><br />  <br />
// <img src={userAc.photoURL} alt="" />
// <h1>Name: {userAc.displayName}</h1>
// <h3>Email: {userAc.email}</h3>}

//<br /><br />
      //<form onSubmit={submitHandle}>
        //<input onBlur={handleEmailBlur} type="email" name="" id="email" />
        //<input onBlur={handlePassBlur} type="password" name="" id="pass" />
        //<br /><br /> <button type="submit">Submit</button>
      //</form>