import { useNavigate } from 'react-router-dom';
import banner from '/banner.jpg'
import { toast } from 'react-toastify';

export default function New_Banner({setPage}) {

    const navigate = useNavigate();

  const checkAuth = () => {
  
    if(localStorage.getItem('token')) {
         
       navigate('/user/submit-news');    
    } else {
      toast("First Create account!")
      navigate('/normal_user_signup'); 
    }
  }

  return (
    <section className="relative h-96 w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="relative">
              Quick Publish
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            </span>
          </h1>
           <p className='text-black'>Ready to Share Your Story?</p>
          <p className="mx-auto  max-w-2xl text-lg text-gray-200 sm:text-xl">
            QuickPublish empowers you to submit your news to top newspapers.  
          </p>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-200 sm:text-xl">
             Create an account today and start
            sharing your stories with the world.
          </p>

          <button
            
            onClick={checkAuth} 
            className="min-w-[200px] px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Submit Your News
          </button>
        </div>
      </div>
    </section>
  )
}
