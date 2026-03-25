'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const nav = useRouter()
  const pathname = usePathname()
  const [token, settoken] = useState("")
  console.log(pathname)
  useEffect(() => {
    const storedToken = localStorage.getItem("Token")
    if (storedToken) {
      settoken(JSON.parse(storedToken))
    }
  },[pathname])
  const logOut = () => {
    localStorage.clear()
    cookieStore.delete("Token")
    settoken("")
    nav.push("/Home")
  }
  return (
    <>
      <div className=" p-2 d-flex gap-3 sticky-top bg-secondary ps-5 pe-5">


        {
          !token ?
            <div className='d-flex gap-3'>
              <Link href="/Home" className='text-light text-decoration-none link'>Home</Link>
              <Link href="/Login" className='text-light text-decoration-none link'>Login</Link>
              <Link href="/SignUp" className='text-light text-decoration-none link'>Sign Up</Link>
            </div> :
            <div className='w-100 d-flex gap-3'>
              <Link href="/profile" className='text-light text-decoration-none link'>Profile</Link>

              <Link href="/Create" className='text-light text-decoration-none link'>Create</Link>
              <Link href="/View" className='text-light text-decoration-none link'>View</Link>
              <Link href="/completed" className='text-light text-decoration-none link'>completed</Link>
              <button type='button' className='btn border p-1 ps-2 pe-2 text-light  ms-auto' onClick={() => logOut()}>LogOut</button>
            </div>

        }




      </div>

    </>
  )
}

export default Nav
