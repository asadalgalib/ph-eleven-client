import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewCard from './ReviewCard';
import { AuthContext } from '../../Context/AuthProvider';

const Reviews = () => {
    const {reviews, setReviews} = useContext(AuthContext)
    const service = useLoaderData();
    const { _id: service_id } = service

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews?id=${service_id}`)
            .then(res => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch(err => {
                toast.error(err.code);
            })
    }, [])

    return (
        <div className='bg-base-200 px-4 md:px-12 lg:px-28 py-8 md:py-12 lg:py-20'>
            <div>
                <h1 className='text-center text-2xl lg:text-4xl font-semibold'>Reviews</h1>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8'>
                {
                    reviews.map(review => <ReviewCard key={review._id} data={review}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;