import React, { useContext } from 'react';
import review from '../../assets/give-review.jpg'
import RateComponent from '../Pages/RateComponent';
import { AuthContext } from '../../Context/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddReview = () => {
    const { rating, user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id } = service

    // console.log(service);
    const handleReview = e => {
        e.preventDefault();

        const form = e.target;
        const name = user.displayName;
        const photo = user.photoURL
        const email = user.email
        const review = form.review.value;
        const service_id = _id;

        const myReview = { name, email, photo, service_id, rating, review }
        console.log(myReview);

        axios.post('http://localhost:5000/service-review', myReview)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Review Submited",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
            .catch(err => {
                toast.error(err.code);
            })

    }

    return (
        <div className=' px-4 md:px-12 lg:px-28 py-8 md:py-12 lg:py-20'>
            <div className='grid lg:grid-cols-[2fr_2fr] gap-10 '>
                <div className='border border-customGreen p-4 rounded-sm bg-green-100'>
                    <img src={review} className='rounded-sm' alt="" />
                </div>
                <div className='flex flex-col'>
                    <div className='flex-1'>
                        <h1 className='text-center text-2xl lg:text-4xl font-semibold'>Add review</h1>
                        <p className='text-center max-w-xl mx-auto mt-2'>You can share your opinions about a service by submitting a review. The review will include a rating, text, and your profile information.</p>
                    </div>
                    <div >
                        <form onSubmit={handleReview}>
                            <div className="form-control">
                                <label className="label">
                                    <span className=" text-black">Give Rating</span>
                                </label>
                                <RateComponent></RateComponent>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Write Something</span>
                                </label>
                                <textarea name='review'
                                    placeholder="review"
                                    className="textarea textarea-bordered textarea-md w-full" required></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-outline rounded-sm bg-customGreen border-none text-white">Add Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;