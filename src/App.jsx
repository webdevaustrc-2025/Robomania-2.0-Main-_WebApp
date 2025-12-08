
import './App.css'
import Navbar from './navbar.jsx'
import Home from './Main_pages/Home.jsx';
import { AuroraBackground } from './components/ui/aurora-background.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Main_pages/About.jsx';
import Segments from './Main_pages/Segments.jsx';
import Activites from './Main_pages/Activites.jsx';
import OurGrossReach from './Main_pages/OurGrossReach.jsx';
import Gold from './Main_pages/Partners/Gold.jsx';
import Platinum from './Main_pages/Partners/Platinum.jsx';
import Premium from './Main_pages/Partners/Premium.jsx';
import Supporting from './Main_pages/Partners/Supporting.jsx';
import { DotBackground } from './components/ui/DotBackground.jsx';
import Footer from './Footer.jsx';
import Contact from './Main_pages/Contact.jsx';
import Register from './Main_pages/Register.jsx';


import SoccerBot from './Main_pages/segment_details/SoccerBot.jsx';
import LineFollowingRobot from './Main_pages/segment_details/LineFollowingRobot';
import InnovatorsArena from './Main_pages/segment_details/InnovatorsArena';
import CircuitWizardry from './Main_pages/segment_details/CircuitWizardry';
import Cadyssey from './Main_pages/segment_details/Cadyssey';
import RoboProjectHackathon from './Main_pages/segment_details/RoboProjectHackathon';
import ADCanvas from './Main_pages/segment_details/ADCanvas';
function App() {
  return (
   <BrowserRouter>
    <DotBackground>
       <Navbar />
        <div className="relative  w-full pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activites/>} />
            <Route path="/partners/gold" element={<Gold/>} />
            <Route path="/partners/platinum" element={<Platinum/>} />
            <Route path="/partners/premier" element={<Premium/>} />
            <Route path="/partners/supporting" element={<Supporting/>} />
            <Route path="/segments" element={<Segments/>} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/contact" element ={<Contact/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/segment/soccer-bot" element={<SoccerBot />} />
            <Route path="/segment/line-following-robot" element={<LineFollowingRobot />} />
            <Route path="/segment/innovators-arena" element={<InnovatorsArena />} />
            <Route path="/segment/circuit-wizardry" element={<CircuitWizardry />} />
            <Route path="/segment/cadyssey" element={<Cadyssey />} />
            <Route path="/segment/roboproject-hackathon" element={<RoboProjectHackathon />} />
            <Route path="/segment/adcanvas" element={<ADCanvas />} />
          </Routes>
        </div>
        <Footer/>
    </DotBackground>
    </BrowserRouter>
  )
}

export default App;
