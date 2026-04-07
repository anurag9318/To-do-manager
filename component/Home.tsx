'use client'
import SignUp from '@/component/Signup'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const nav= useRouter()
  const login=()=>{
    nav.push("/Login")
  }
  const signup=()=>{
    nav.push("/SignUp")
  }
  return (
    <div className='container'>
      <div className="row m-0">
        <div className=" col-md-7 mt-5 ">
          <div className='mt-5 ms-5 '>
            <div className='w-25'><h1 className='text-light text-start fs-7 '>Task </h1></div>
            <div className='w-75'><h1 className='text-info text-end fs-7'>Management</h1></div>
            <div className='w-75'><h1 className='text-light text-center fs-7'>System</h1></div>
          </div>
          <div className='mt-5 text-center'>
          <button className='btn btn-primary me-3 mt-3' onClick={login}>Login</button>
          <button className='btn btn-primary me-3 mt-3' onClick={signup}>Signup</button>
          </div>
        </div>
        <div className=" col-md-5 mt-5">
           <div className='mt-5'>
            <img src={"https://www.shutterstock.com/image-photo/task-management-scheduling-software-todo-600nw-2707593125.jpg"} className='border img-fluid border-info rounded' width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
