import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/login-user',
                { password, email },{
                }
            );
            console.log(response);
            
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('email', response.data.email);
                setEmail(response.data.email);
               return  navigate('/Dashboard');
            }
            else{
              return  alert('not working')
            }
        } catch (error:any) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };
    


    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div className='flex bg-slate-200 items-center justify-center h-screen'>
                    <div className='bg-white rounded-md h-[350px] p-7 w-[420px]'>
                        <h1 className='text-3xl font-bold mt-4'>Login</h1>
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='email'
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-5 rounded-md h-10 w-full px-3'
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type='submit' className='bg-black rounded-md hover:cursor-pointer text-white h-10 w-full mt-5'>
                            Login
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login