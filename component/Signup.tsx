"use client"
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as yup from 'yup'

const SignUp = () => {
    const nav = useRouter()
    const schema = yup.object().shape({
        name: yup.string().required().min(3).max(20).trim(),
        age: yup.string().required(),
        email: yup.string().required().email().trim(),
        password: yup.string().required().min(6).max(10),
        profile: yup.mixed().required()
    })
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleRegister = async (data: any) => {
        try {
            // if (data.profile.length === 0) {
            //     alert("Please upload the file")
            //     return;
            // }
            console.log(data)
            let formdata = new FormData()
            formdata.append("name", data.name)
            formdata.append("email", data.email)
            formdata.append("age", data.age)
            formdata.append("password", data.password)
            formdata.append("profile", data.profile[0])

            console.log(formdata);


            const result = await axios.post("/api/user", formdata)
            if (result.data.success) {
                Swal.fire({
                    title: "success",
                    text: result.data.message,
                    icon: "success"
                })
                nav.push("/Login")
            } else {
                Swal.fire({
                    title: "failed",
                    text: result.data.message,
                    icon: "error"
                })
            }

        } catch (error) {
            Swal.fire({
                title: "failed",
                text: "Internal server error",
                icon: "error"
            })
        }
    }
    return (
        <>
            <div className='vh-100 bg-dark '>
                <div className="row bg-dark p-5 m-0">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 mt-5 p-4  border rounded shadow ">
                        <h1 className='text-center text-info'> SignUp Form</h1>
                        <form onSubmit={handleSubmit(handleRegister)} className='mt-4'>
                            <input type='text' {...register("name")} className='form-control mt-2' placeholder='enter your name'></input>
                            {errors?.name && <p className='text-danger'>{errors?.name?.message}</p>}
                            <input type='email' {...register("email")} className='form-control mt-2' placeholder='enter your email'></input>
                            {errors?.email && <p className='text-danger'>{errors?.email?.message}</p>}
                            <label className='text-light mt-3'>Date of Birth  </label>
                            <input type='date' {...register("age")} className='form-control mt-2' placeholder='enter your dob'></input>
                            {errors?.age && <p className='text-danger'>{errors?.age?.message}</p>}
                            <input type='password' {...register("password")} className='form-control mt-2' placeholder='enter your password'></input>
                            {errors?.password && <p className='text-danger'>{errors?.password?.message}</p>}
                            <label className='mt-3 text-light'> Profile Image</label>
                            <input {...register("profile")} type='file' className='form-control mt-2'></input>

                            <input type='submit' className='btn btn-info form-control mt-3' value="SignUp"></input>
                        </form>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </>
    )
}

export default SignUp
