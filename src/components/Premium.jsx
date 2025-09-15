import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Premium = () => {
    const [isPremiumUser, setIsPremiumUSer] = useState(false);
    useEffect(() => {
        verifyPaymentStatus();
    },[]);

    const verifyPaymentStatus = async () => {
        const res = await axios.get(BASE_URL + "payment/status", {withCredentials: true});

        if(res.data.isPremium){
            setIsPremiumUSer(true);
        }
    }

    const handlePlan = async (type) => {
        try {
            const res = await axios.post(BASE_URL + "createOrder", {membershipType:type}, {withCredentials:true});
            console.log(res);

            const{amount, currency, orderId, notes} = res.data;

            const options = {
                key: 'rzp_test_RGhbeFIJGXowaJ', // Replace with your Razorpay key_id
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency,
                name: 'Dev Tinder',
                description: 'Test Transaction',
                order_id: orderId, // This is the order_id created in the backend
                prefill: {
                name: notes.firstName
                },
                theme: {
                color: '#F37254'
                },
                handler: verifyPaymentStatus
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch(err) {
            console.log(err);
        }
    }

    return isPremiumUser ? (<h1>You are already premium user !!</h1>) : (
        <div>
            <div class="m-10">
                <div class="flex w-full">
                    <div class="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                        <h1 class="font-bold text-3xl">Silver Membership</h1>
                        <ul><li> - Chat with other people</li>
                        <li> - 100 connection Requests per day</li>
                        <li> - Blue Tick</li><li> - 3 months</li>
                        </ul>
                        <button class="btn btn-secondary" onClick={() => handlePlan("silver")}>Buy Silver</button>
                    </div>
                    <div class="divider divider-horizontal">OR</div>
                    <div class="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center"
                    ><h1 class="font-bold text-3xl">Gold Membership</h1>
                    <ul><li> - Chat with other people</li>
                        <li> - Inifiniye connection Requests per day</li>
                        <li> - Blue Tick</li><li> - 6 months</li>
                    </ul>
                    <button class="btn btn-primary" onClick={() => handlePlan("gold")}>Buy Gold</button>
                </div>
                </div>
                </div>
        </div>
    );
};

export default Premium;