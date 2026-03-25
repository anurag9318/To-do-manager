'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'

const page = () => {
    const schema = yup.object().shape({
        name: yup.string().required().min(3).trim(),
        status: yup.string().required().trim(),
        priority: yup.string().required().trim(),
        due: yup.string().required("Due Date is required").trim(),
        des: yup.string().required("Description is required field").min(3).trim()
    })
    const { handleSubmit, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleRegister = async (data: any) => {
        const id = localStorage.getItem("ID")
        data.id = id
        try {
            const result = await axios.post(`/api/task`, data)
            if (result.data.success) {
                Swal.fire({
                    title: "success",
                    text: result.data.message,
                    icon: "success"
                })
                reset()
                fetchData()
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
    const [databtn, setdatabtn] = useState(true)
    const [task, setTask] = useState([])
    const [msg, setMsg] = useState<any>(null)
    const showData = () => {

        setdatabtn(!databtn)
        if (databtn == true) {
            if (msg?.code === 500) {
                Swal.fire({
                    title: "failed",
                    text: msg.message,
                    icon: "error"
                })
            }

        }

    }
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {

        try {
            const fetchTask = await axios.get("/api/task")
            // setTask(fetchTask.data.Task)       

            if (fetchTask.data.success) {
                // Swal.fire({
                //     title:"success",
                //     text:fetchTask.data.message,
                //     icon:"success"
                // })
                setTask(fetchTask.data.Task)
            } else {
                setMsg(fetchTask.data)
            }

        } catch (error: any) {
            Swal.fire({
                title: "failed",
                text: error,
                icon: "error"
            })
            console.log(error)
        }
    }
    const handleDelete = async (id: any) => {
        Swal.fire({
            title: "Delete",
            text: "Are you sure, it will not revert",
            showCancelButton: true,
            cancelButtonColor: "red",
            confirmButtonColor: "blue",
            icon: "warning"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axios.delete(`/api/task?id=${id}`)
                // if (result.data.success) {
                Swal.fire({
                    title: result.data.title,
                    text: result.data.message,
                    icon: result.data.icon
                })
                fetchData()
                // }else{
                //      Swal.fire({
                //         title: "failed",
                //         text: "something wrong ",
                //         icon: "error"
                //     })
                // }

            }
        })


    }
    return (
        <div className='bg-dark vh-100 w-100 body-color'>
            <div className="row p-5">
                <div className="col-sm-5 ">
                    <div className='border rounded transparent shadow p-3 forms'>
                        <h1 className='text-light text-center'>Create Task</h1>
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
                            <input type='submit' className='btn btn-info form-control mt-3' value="Create"></input>
                        </form>
                    </div>
                </div>
                <div className="col-sm-7">
                    <button className='btn btn-warning mb-3' onClick={showData}>{databtn ? "show Task" : "hide Task"}</button>
                    {
                        databtn ? "" :
                            <table className='table '>
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Task</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='table-dark'>
                                    {
                                        task.length > 0 ?
                                            task?.map((item: any, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.priority}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.due}</td>
                                                        <td>{item.des}</td>
                                                        <td>
                                                            <button className='btn btn-danger me-3' onClick={() => handleDelete(item._id)}>Del</button>
                                                            <button className='btn btn-warning me-3'>Edit</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan={7} className='text-center'>
                                                <h1>No Task Available</h1>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </div>

        </div>
    )
}

export default page
