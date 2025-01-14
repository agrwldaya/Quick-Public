import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    empName: '',
    empMail: '',
    state: '',
    empPhoneNo: '',
    city: '',
    pincode: '',
    password: '',
    role: '',
    proofId: null,
  });

  const token = localStorage.getItem("token") || "";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in employee) {
      formData.append(key, employee[key]);
    }

    try {
      const response = await axios.post("https://quick-public.onrender.com/api/v1/client/addemployee", formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields after successful submission
        setEmployee({
          empName: '',
          empMail: '',
          state: '',
          empPhoneNo: '',
          city: '',
          pincode: '',
          password: '',
          role: '',
          proofId: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Employee Management</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Add Employee</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Employee Name</label>
                <input
                  id="name"
                  name="empName"
                  type="text"
                  required
                  onChange={handleChange}
                  value={employee.empName}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Employee Email</label>
                <input
                  id="email"
                  name="empMail"
                  type="email"
                  required
                  onChange={handleChange}
                  value={employee.empMail}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="Number" className="block text-sm font-medium text-gray-700">Employee PhoneNo</label>
                <input
                  id="Number"
                  name="empPhoneNo"
                  type="Number"
                  required
                  onChange={handleChange}
                  value={employee.empPhoneNo}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  onChange={handleChange}
                  value={employee.state}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  onChange={handleChange}
                  value={employee.city}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  onChange={handleChange}
                  value={employee.pincode}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  value={employee.password}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  id="role"
                  name="role"
                  required
                  onChange={handleChange}
                  value={employee.role}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select a role</option>
                  <option value="National">National</option>
                  <option value="state">State</option>
                  <option value="local">Local</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="proofId"
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
              <div>
                <button
                  type="submit"
                  className="w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
