import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from "motion/react"
import { IoStar, IoStarHalf } from 'react-icons/io5';
import Swal from 'sweetalert2';
import UpdateReview from './UpdateReview';

const MyReview = () => {
    const { user,setRating } = useContext(AuthContext);
    const [myReview, setMyReview] = useState([])
    const [updateData, setUpdateData] = useState([])
    const [filteredService, setFilteredService] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/myreview?email=${user.email}`)
            .then(res => {
                console.log(res.data);
                setMyReview(res.data);
                setFilteredService(res.data);
            })
            .catch(err => {
                toast.error(err.code)
            })
    }, [user?.email])

    const handleDelete = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/myreview/delete?id=${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        toast.error(err.code);
                    })

                const remaining = filteredService.filter(data => data._id !== id)
                setFilteredService(remaining);
            }
        });
    }

    const handleUpdate = id =>{
        document.getElementById('my_modal_2').showModal();

        axios.get(`http://localhost:5000/review?id=${id}`)
        .then(res =>{
            console.log(res.data);
            setUpdateData(res.data);
            setRating(res.data.rating);
        })
        .catch(err => {
            toast.error(err.code);
        })
    }

    return (
        <div className='max-w-4xl mx-auto px-4 md:px-12 lg:px-28 py-8 md:py-12 lg:py-20 min-h-screen'>
            <div>
                <h1 className='text-center text-2xl lg:text-4xl font-semibold'>My Reviews</h1>
            </div>
            <div className='rounded-sm bg-base-200 grid grid-cols-1 items-center justify-center gap-8 p-5 mt-5'>
                {
                    filteredService.map(review =>

                        <motion.div key={review._id} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} className="flex justify-between items-center gap-5 p-5 bg-green-100 rounded-sm border-2 border-customGreen w-full">
                            <div>
                                <div className='flex-1'>
                                    <img className='rounded-full w-20'
                                        src={review.photo}
                                        alt="Shoes" />
                                </div>
                                <div className="mt-4">
                                    <h1 className='text-xl font-medium'>{review.name}</h1>
                                    <p className=''><span className='font-medium'>Service Title :</span> {review.service_title}</p>
                                    <div className='flex items-center justify-start gap-2'>
                                        <p className='font-medium'>Rating : {review.rating}</p>
                                        <p className='flex items-center justify-center text-yellow-400'><IoStar /><IoStar /><IoStar /><IoStar /> <IoStarHalf /></p>
                                    </div>
                                    <p className=''><span className='font-medium'>Review :</span> {review.review}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <button onClick={()=>handleUpdate(review._id)} className="btn btn-ghost btn-sm bg-customGreen hover:bg-customBlue text-white">Edit</button>
                                <button onClick={() => handleDelete(review?._id)} className="btn btn-ghost btn-sm bg-customGreen hover:bg-customBlue text-white">Delete</button>
                            </div>
                        </motion.div>)

                }
            </div>
            {/* modal */}
            <dialog id="my_modal_2" className="modal">
                <div className="">
                    <UpdateReview data={updateData}></UpdateReview>
                </div>
            </dialog>
            {/* modal */}
        </div>
    );
};

export default MyReview;