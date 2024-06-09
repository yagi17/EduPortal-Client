import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';\
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const CheckoutForm = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useAuth();
  const stripe = useStripe();
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState([]);
  const [enrolledStudent, setEnrolledStudent] = useState([]);
  const [clientSecret, setClientSecret] = useState([]);
  const price = classInfo.price;
  const navigate = useNavigate();

  const localDate = new Date();
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(localDate.getUTCSeconds()).padStart(2, "0");
  const utcDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const count = enrolledStudent;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  useEffect(() => {
    axiosSecure.get(`/classes/${id}`).then((res) => {
      setClassInfo(res.data);
      setEnrolledStudent(res.data.enrolledStudent);
    });
  }, [axiosSecure, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Payment Error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }
    // Confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("Payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        let updatedCount = count + 1;
        axiosSecure
          .patch(`/enrolled/classes/${id}`, { enrolledStudent: parseInt(updatedCount) })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              const payment = {
                email: user.email,
                classId: classInfo._id,
                price: price,
                classData: classInfo,
                transactionId: paymentIntent.id,
                date: utcDateTime, //utc data convert . use moment js to convert in utc
              };
              console.log("payment info", payment);
              axiosSecure.post("/enrollments", payment).then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Payment successful",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate("/dashboard/my-enrolled-class");
                }
              });
            }
          });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen md:bg-base-200">
      <div className=" md:min-w-[450px] mx-auto p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1DA678]">
          Contact Information
        </h2>
        <form onSubmit={handleSubmit} className=" mx-auto">
          <div className="mb-4">
            <label className="block text-[#1DA678] font-bold mb-2">
              Class ID
            </label>
            <input
              type="text"
              value={classInfo?._id}
              readOnly
              className="w-full p-2 border border-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#1DA678] font-bold mb-2">
              Your Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              readOnly
              className="w-full p-2 border border-black rounded"
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-[#1DA678] font-bold mb-2">
              Card Information
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <button
            type="submit"
            className="btn w-full bg-[#1DA678] hover:bg-[#1DA678] border-0 hover:glass text-white"
            disabled={loading || !clientSecret}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
