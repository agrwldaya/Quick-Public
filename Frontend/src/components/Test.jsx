import { useState } from 'react'

export default function AddGroupPage() {
  const [groupName, setGroupName] = useState("")
  const [studentName, setStudentName] = useState('')
  const [members, setMembers] = useState([{ name: '', userId: '' }])
  const [tasks, setTasks] = useState([{ description: '', dueDate: '' }])

  const addMember = () => {
    setMembers([...members, { name: '', userId: '' }])
  }

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members]
    updatedMembers[index][field] = value
    setMembers(updatedMembers)
  }
  
  const addTask = () => {
    setTasks([...tasks, { description: '', dueDate: '' }])
  }

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const updateTask = (index, field, value) => {
    const updatedTasks = [...tasks]
    updatedTasks[index][field] = value
    setTasks(updatedTasks)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ groupName, studentName, members, tasks })
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Group</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            id="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            id="studentName"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Members</label>
          {members.map((member, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => updateMember(index, 'name', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="User ID"
                value={member.userId}
                onChange={(e) => updateMember(index, 'userId', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => removeMember(index)} className="text-red-500 p-2">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addMember} className="mt-2 text-blue-500 p-2">
            + Add Member
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tasks</label>
          {tasks.map((task, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <textarea
                placeholder="Task description"
                value={task.description}
                onChange={(e) => updateTask(index, 'description', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => updateTask(index, 'dueDate', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => removeTask(index)} className="text-red-500 p-2">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addTask} className="mt-2 text-blue-500 p-2">
            + Add Task
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Create Group</button>
      </form>
    </div>
  )
}
