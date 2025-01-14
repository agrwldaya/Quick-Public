import React, { useState } from "react";
import SignUpTop from "./SignUpTop";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { ClientAuthSliceActions } from "../../Store/clientAuthSliece";

const SignupStep2 = ({handleClientStep}) => {

  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    CompanyCode: "",
    phoneNo: "",
    address: "",
    documents: null,
    logo: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    dispatch(ClientAuthSliceActions.setSignupDataTwo(formData));

    try {
      const response = await axios.post(
        "https://quick-public.onrender.com/api/v1/client/signup",
        formDataToSend,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/client");
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
            name="CompanyCode"
            id="floating_company_code"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.CompanyCode}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_company_code"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Code
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phoneNo"
            id="floating_phone_no"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_phone_no"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="address"
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="documents"
            id="floating_documents"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_documents"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Proof Documents
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="logo"
            id="floating_logo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_logo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Logo
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <Link to="/company_email_verify" className="underline text-blue-500">
            Back to Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupStep2;
