 

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';


export default function EmployeeList() {
  const token = localStorage.getItem("token")
  const [employees, setEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [filterType, setFilterType] = useState('empName')

  useEffect(()=>{
    getEmpList()
  },[])

  const getEmpList = async () => {
    try {
   
      const response = await axios.get("https://quick-public.onrender.com/api/v1/client/get_profile", {
        headers: {token} // Correct header format
      });
      if (response.data.success) {
          setEmployees(response.data.client.employeeList); // No need to append, just set the new lis
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };
  

  const employeesPerPage = 10
  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  
  const filteredEmployees = employees.filter(employee => 
    employee[filterType].toLowerCase().includes(filter.toLowerCase())
  )

  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  const addEmployee = () => {
    alert('Add Employee functionality would be implemented here')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Employee List
      </motion.h1>


      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex space-x-2 mb-4 md:mb-0">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-[180px] px-3 py-2 border rounded-md">
            <option value="empName">Name</option>
            <option value="empMail">Email</option>
            <option value="state">State</option>
            <option value="empPhoneNo">State</option>
            <option value="city">City</option>
            <option value="pincode">Pin Code</option>
            <option value="role">Role</option>
          </select>
          <input 
            type="text" 
            placeholder={`Filter by ${filterType}...`} 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border rounded-md"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto"
        >
          <button 
            onClick={addEmployee}
            className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <FiPlus className="mr-2" /> Add Employee
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white shadow-md rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEmployees.map((employee) => (
                <motion.tr 
                  key={employee._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.empName}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.empMail}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.empPhoneNo}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.city}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.state}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.pincode}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{employee.role}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                    <span className="text-blue-500 hover:cursor-pointer">Edit</span>
                    <span className="text-red-500 hover:cursor-pointer"><MdDelete /></span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} employees
        </p>
        <div className="flex space-x-2">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-md ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
          >
            <FiChevronLeft />
          </button>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={indexOfLastEmployee >= filteredEmployees.length}
            className={`px-3 py-2 border rounded-md ${indexOfLastEmployee >= filteredEmployees.length ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
