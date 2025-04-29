// import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

function Login() {
    const [state, setState] = useState('signUp')
    // const [id, setId] = useState([])

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [DOB, setDOB] = useState('')
    const [employeecode, setEmployeecode] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [jobtitle, setJobtitle] = useState('')
    const [basicsalary, setBasicSalary] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    // const navigate = useNavigate()

    // const onSubmitHandler = async (event) => {
    //     event.preventDefault()
    //     try {
    //         if (state === 'signUp') {
    //             // Sign-up logic
    //             const { data } = await axios.post(
    //                 'http://localhost:3000/api/create-user',
    //                 { name, password, email }
    //             )
    //             console.log(data);

    //             if (data.success) {
    //                 localStorage.setItem('email', data.email)
    //                 setEmail(data.email)
    //                 // console.log(email);
    //                 console.log("response", data);
    //                 navigate('/Dashboard')

    //             }


    //         } else {
    //             // Login logic
    //             const { data } = await axios.post(
    //                 'http://localhost:3000/api/login-user',
    //                 { password, email, }
    //             )
    //             console.log(data);
    //             if (data.success) {
    //                 localStorage.setItem('token', data.data.token); // Save token
    //                 localStorage.setItem('id', data.data.id);
    //                 localStorage.setItem('email', data.data.email)
    //                 setEmail(data.email)
    //                 navigate('/Dashboard')
    //             }

    //         }
    //     } catch (error) {
    //         alert(error.response?.data?.message || 'Something went wrong')
    //     }
    // }


    return (
        <div>
            <form>
                <div className='flex bg-slate-200 items-center justify-center h-[150vh]'>
                    <div className='bg-white rounded-md h-[900px] p-7 w-[420px]'>
                        <h1 className='text-3xl font-bold mt-4'>
                            {state === 'signUp' ? 'Create Account' : 'Login'}
                        </h1>

                        {state === 'signUp' && (
                            <div className='w-full'>
                                <input
                                    className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                                    type='text'
                                    placeholder='Full name'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='username'
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='email'
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='phone'
                            value={phone}
                            placeholder='Phone'
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='Date'
                            value={DOB}
                            placeholder='DOB'
                            onChange={(e) => setDOB(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='gender'
                            value={gender}
                            placeholder='Gender'
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='jobtitle'
                            value={jobtitle}
                            placeholder='Job Title'
                            onChange={(e) => setJobtitle(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='Employee code'
                            value={employeecode}
                            placeholder='Employee Code'
                            onChange={(e) => setEmployeecode(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='Date'
                            value={joiningDate}
                            placeholder='Joining Date'
                            onChange={(e) => setJoiningDate(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='addres'
                            value={address}
                            placeholder='Address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <input
                            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                            type='number'
                            value={basicsalary}
                            placeholder='Basic Salary'
                            onChange={(e) => setBasicSalary(e.target.value)}
                            required
                        />
                        <button className='bg-black rounded-md hover:cursor-pointer text-white h-10 w-full mt-4'>
                            {state === 'signUp' ? 'Create Account' : 'Login'}
                        </button>

                        {state === 'signUp' ? (
                            <p className='mt-5'>
                                Already have an account?{' '}
                                <span
                                    className='text-blue-600 underline cursor-pointer'
                                    onClick={() => setState('login')}
                                >
                                    Login here
                                </span>
                            </p>
                        ) : (
                            <p className='mt-5'>
                                Create Account?{' '}
                                <span
                                    className='text-blue-600 cursor-pointer underline'
                                    onClick={() => setState('signUp')}
                                >
                                    Click here
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login