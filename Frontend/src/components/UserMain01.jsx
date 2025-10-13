import New_Navbar from "./New_Nav"
 
 
import Footer from "./Normaluser/Footer"
import AboutUs from "./Normaluser/AboutUS"
import ServicesPage from "./Normaluser/Services"
import ContactUs from "./Normaluser/ContactUS"
import { useNavigate } from "react-router-dom"
import Navbar02 from "./NabBar02"
import New_Banner from "./New_Banner"

export default function UserMain01() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")

  if (token && user === "normal") {
    navigate("/")
  } else if (token && user === "client") {
    navigate("/client")
  } else if (token && user === "employee") {
    navigate("/employee")
  }

  return (
    <div>
      <New_Navbar />
      {/* <div className="mt-2 h-7 mb-7">
        <Navbar02 />
      </div> */}

      <section id="home">
        <New_Banner/>
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="services">
        <ServicesPage />
      </section>

      <section id="contact">
        <ContactUs />
      </section>

      <Footer />
    </div>
  )
}
