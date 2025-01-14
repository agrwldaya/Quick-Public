import React, { useState } from "react";
import SignUpTop from "./SignUpTop";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios"; // Make sure to import axios
import { ClientAuthSliceActions } from "../../Store/clientAuthSliece";
 
const SignupStep1 = ({handleClientStep}) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyMail: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(ClientAuthSliceActions.setSignupDataOne(formData));
    
    try {
      const response = await axios.post(
        "https://quick-public.onrender.com/api/v1/client/sendotp",
        { email: formData.companyMail }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        handleClientStep(2)
        // navigate("/company_mail_otp_verify");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-full mx-auto flex flex-col justify-center items-center mt-10">
      <SignUpTop />
      <form className="max-w-full mx-auto w-1/2" onSubmit={handleVerify}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="companyName"
            id="floating_company_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_company_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="companyMail"
            id="floating_company_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.companyEmail}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_company_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="flex justify-between">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Verify Company Email
        </button>

        <Link to='/company_signup' className="underline text-blue-500">Email already verified</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupStep1;
