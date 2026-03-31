import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./components/Authentication/ProtectedRoute"
import "./App.css"
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoginPage from './components/Authentication/LoginPage'
import SignupPage from './components/Authentication/SignupPage'
import ContactPage from './components/layout/ContactPage'
import AboutPage from './components/layout/AboutPage'
import Home from './components/layout/Home'
import UserDashboard from './components/dashboard/UserDashboard'
import AgentTravel from './components/Agent/AgentTravel'
import Services from './components/layout/Services'
import ScrollToTop from './components/layout/ScrollToTop'
import BookAgentPage from './components/Agent/BookAgent'
import GoogleSuccess from './components/Authentication/GoogleSuccess'
import UserProfile from './components/Authentication/UserProfile'
import NotFound from './components/ui/NotFound'


const App = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />

       <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
       <Route path="/agent" element={<ProtectedRoute><AgentTravel /></ProtectedRoute>}/>
       <Route path="/book-agent" element={<ProtectedRoute>< BookAgentPage/></ProtectedRoute>}/>

        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        // Example React Router
         <Route path="/google-success" element={<GoogleSuccess />} />
        {/* <Route path="/agent" element={<AgentTravel />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        {/* <Route path="/book-agent" element={< BookAgentPage />} /> */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
