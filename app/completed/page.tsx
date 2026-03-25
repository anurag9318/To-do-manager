'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const page = () => {
    const [records, setRecords] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await axios.get("/api/task")
        if (result) {
            setRecords(result.data.Task)
        }
    }
    const [colorcode, setcolorcode] = useState([{ "value": "progress", "color": "blue" }, { "value": "pending", "color": "orange" }, { "value": "completed", "color": "green" }, { "value": "rejected", "color": "red" }, { "value": "hold", "color": "grey" }])

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
                if (result.data.success) {
                    Swal.fire({
                        title: result.data.title,
                        text: result.data.message,
                        icon: result.data.icon
                    })
                    fetchData()
                }
            }
        }
        )


    }
    return (
        <>
            <div className="row mt-5">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <table className='table bg-body-tertiary'>
                        <thead className='table-dark'>
                            <tr >
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>priority</th>
                                <th>due Date</th>
                                <th>description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-dark'>
                            {  
                                records?.length>0 ?
                                Array?.isArray(records) && records?.map((item: any, index) => {
                                    if (item.status == "completed") {
                                        return (

                                            <tr key={index + 1}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td style={{ color: colorcode.find(c => c.value === item.status)?.color }}>
                                                    {item.status}
                                                </td>
                                                <td>{item.priority}</td>
                                                <td>{item.due}</td>
                                                <td>{item.des}</td>
                                                <td>
                                                    <button className='btn btn-danger border rounded me-3' onClick={() => handleDelete(item._id)}>Del</button>
                                                    <button className='btn btn-warning border rounded me-3'>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }) :
                                            <tr>
                                                <td colSpan={7} className='text-center'>
                                                <h2>No Task Available</h2>
                                                </td>
                                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-1"></div>
            </div>
        </>
    )
}

export default page
