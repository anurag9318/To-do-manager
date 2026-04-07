'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const profile = () => {
  interface User {
    name: string
    profile: string
    email: string
    age: string
    _id: string
    createdAt:string
  }
  const [user, setuser] = useState<User | null>(null)
  useEffect(() => {
    fetchData()
  }, [])
  console.log(user)
  const fetchData = async () => {
    const result = await axios.get("/api/user")
    setuser(result.data.dashboard)
  }

  return (
    <>
      <div className="row ps-5 pe-5 m-0 mt-5 bg-dark text-light">
        <div className="col-sm-4 ">
          <div className='p-5 '>
            <img src={`${user?.profile }`}  width={250} height={250} className=' profile-img'></img>
          </div>
        </div>
        <div className="col-sm-8 mt-5 fs-4">
          <div className="row mb-2">
            <div className="col-sm-2">UserID</div>
            <div className="col-sm-3">{user?._id}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-2">Name</div>
            <div className="col-sm-3">{user?.name}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-2">Email</div>
            <div className="col-sm-3">{user?.email}</div>
          </div>
          <div className="row">
            <div className="col-sm-2">Date of birth</div>
            <div className="col-sm-3">{user?.age}</div>
          </div>
           <div className="row">
            <div className="col-sm-2">Create ID</div>
            <div className="col-sm-3">{user?.createdAt.split("T")[0]}</div>
          </div>
        </div>
      </div>


    </>
  )
}

export default profile
