'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
export const dynamic= 'force-dynamic'



const page = () => {
    const searchparam = useSearchParams()
    const id = searchparam.get("id")
    console.log(id)
    const nav= useRouter()
    type Task = {
        name: string
        status: string
        priority: string
        due: string
        des: string
    }
    const [item, setItem] = useState<Task | null>(null)
    useEffect(() => {
        const storeItem = localStorage.getItem("Item")
        if (storeItem) {
            const parseItem = JSON.parse(storeItem)
            setItem(parseItem)
            console.log(parseItem)
        }
    }, [])
    useEffect(() => {
        if (item) {
            setValue("name", item?.name)
            setValue("status", item?.status)
            setValue("priority", item?.priority)
            setValue("due", item?.due)
            setValue("des", item?.des)
        }
    }, [item])
    const schema = yup.object().shape({
        name: yup.string().required().min(3).trim(),
        status: yup.string().required().trim(),
        priority: yup.string().required().trim(),
        due: yup.string().required("Due Date is required").trim(),
        des: yup.string().required("Description is required field").min(3).trim()
    })
    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleRegister = async (data: any) => {
        const userid = localStorage.getItem("ID")
        data.id = userid
        try {
            const result = await axios.put(`/api/task?id=${id}`, data)
            if (result.data.success) {
                Swal.fire({
                    title: "success",
                    text: result.data.message,
                    icon: "success"
                })
                nav.push("/View")
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
                text: `Internal server error ${error}`,
                icon: "error"
            })
        }
    }
    return (
        <div className='bg-dark vh-100 w-100 body-color'>
            <div className="row p-5 m-0">
                <div className="col-sm-5 ">
                    <div className='border rounded transparent shadow p-3 forms'>
                        <h1 className='text-light text-center'>Update Task</h1>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <input type='text' {...register("name")} className='form-control mt-3 ' placeholder='enter task name'></input>
                            {errors?.name && <p className='text-danger'>{errors?.name?.message}</p>}

                            <select {...register("status")} className='form-control mt-3'>
                                <option value=""> Select status</option>
                                <option > progress</option>
                                <option > pending</option>
                                <option > hold</option>
                                <option > completed</option>
                                <option > rejected</option>
                            </select>
                            {errors?.status && <p className='text-danger'>{errors?.status?.message}</p>}
                            <select {...register("priority")} className='form-control mt-3'>
                                <option value=""> Select priority</option>
                                <option > Low</option>
                                <option > Medium</option>
                                <option > High</option>
                            </select>
                            {errors?.priority && <p className='text-danger'>{errors?.priority?.message}</p>}
                            <label className=' mt-3 bg-transparent text-light'>  Due Date :</label>

                            <input type='date' {...register("due")} className='form-control'></input>
                            {errors?.due && <p className='text-danger'>{errors?.due?.message}</p>}
                            <input type='text' {...register("des")} className='form-control mt-3 ' placeholder='enter descripton'></input>
                            {errors?.des && <p className='text-danger'>{errors?.des?.message}</p>}
                            <input type='submit' className='btn btn-info form-control mt-3' value="Update"></input>
                        </form>
                    </div>
                </div>
                <div className="col-sm-7"></div>
            </div>

        </div>
    )
}

export default page
