"use client"
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2' 
import * as yup from 'yup'


const Login = () => {
    const nav = useRouter()
    const schema = yup.object().shape({
        email: yup.string().required().email().trim(),
        password: yup.string().required().min(6).max(10)
    })
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleRegister = async (data: any) => {
        try {
            const result = await axios.post("/api/user_login", data)
            if (result.data.success) {
                Swal.fire({
                    title: `Welcome ${result.data.name}`,
                    text: result.data.message,
                    icon: "success"
                })
                const token = localStorage.setItem("Token", JSON.stringify(result.data.token))
                const Token= cookieStore.set("Token", result.data.token)
                const ID= localStorage.setItem("ID", result.data.id)
                cookieStore.set("ID", result.data.id)
                nav.push("/profile")

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
                text: "internal server error 1",
                icon: "error"
            })
        }
    }
    return (
        <>
            <div className='vh-100 bg-dark '>
                <div className="row bg-dark p-5 m-0">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 mt-5 p-4  border rounded shadow forms">
                        <h1 className='text-center text-info'> Login Form</h1>
                        <form onSubmit={handleSubmit(handleRegister)} className='mt-4'>
                            <input type='email' {...register("email")} className='form-control mt-3' placeholder='enter your email'></input>
                            {errors?.email && <p className='text-danger'>{errors?.email?.message}</p>}

                            <input type='password' {...register("password")} className='form-control mt-3' placeholder='enter your password'></input>
                            {errors?.password && <p className='text-danger'>{errors?.password?.message}</p>}

                            <input type='submit' className='btn btn-info form-control mt-3' value="Login"></input>
                        </form>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </>
    )
}

export default Login
