import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HeaderNav from './Components/Header';
import Footerpage from './Components/Footer';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import About from './Components/About';
import CarouselPage from './Components/Carouselpage';
import Sidebar from './Admin/AdminHeader';
import AdminHome from './Admin/AdminHome';
import Studentlist from './Admin/Studentlist';
import Teacherlist from './Admin/Teacherlist';
// ✅ Import your ProtectedRoute component
import ProtectedRoute from './Components/ProtectedRoute'; 
import TeacherHeader from './Teacher/TeacherHeader';
import TeacherHome from './Teacher/TeacherHome';
import Profile from './Teacher/Profile';
import StudentHeader from './Students/StudentHeader';
import StudentHome from './Students/StudentHome';
import Marklist from './Students/Marklist';
import Myprofile from './Students/Myprofile';
import ViewStudent from './Teacher/ViewStudent';
import Editteacherprofile from './Teacher/Editteacherprofile';
import Editstudentprofile from './Students/Editstudentprofile';
import AddMark from './Teacher/AddMark';
import ViewMark from './Teacher/ViewMark';
import Editmark from './Teacher/Editmark';
import AddAttendance from './Teacher/AddAttendance';
import AddAssignment from './Teacher/Addassignment';
import Viewassignment from './Teacher/Viewassignment';
import Assignment from './Students/Assignment';
import AdminNews from './Admin/AdminNews';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC SITE WITH HEADER ================= */}
          {/* 💡 Nesting public pages here allows them to share HeaderNav automatically */}
          <Route element={<><HeaderNav /><Outlet /></>}>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Carouselpage" element={<CarouselPage />} />
          </Route>
    
          {/* ================= SECURE ADMIN ROUTES (Teacher/Role 1) ================= */}
          <Route 
            element={
              // Pass the required role name matching your Redux structure ("Teacher" or "1")
              <ProtectedRoute allowedRoles={["Admin", "0"]} />
            }
          >
            {/* Nest the sidebar layout wrapper inside the role guard */}
            <Route element={<><Sidebar /></>}>
              <Route path='/AdminHome' element={<AdminHome />} />
              <Route path='/Studentlist' element={<Studentlist />} />
              <Route path='/Teacherlist' element={<Teacherlist />} />
              <Route path='/AdminNews' element={<AdminNews />} />
            </Route>
          </Route>

           <Route 
            element={
              // Pass the required role name matching your Redux structure ("Teacher" or "1")
              <ProtectedRoute allowedRoles={["Teacher", "1"]} />
            }
          >
            {/* Nest the sidebar layout wrapper inside the role guard */}
            <Route element={<><TeacherHeader /></>}>
              <Route path='/TeacherHome' element={<TeacherHome />} />
              <Route path='/ViewStudent' element={<ViewStudent />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/Editteacherprofile/:id' element={<Editteacherprofile />} />
              <Route path='/AddMark' element={<AddMark />} />
              <Route path='/ViewMark/:id' element={<ViewMark />} />
              <Route path='/Editmark/:id' element={<Editmark />} />
              <Route path='/AddAttendance' element={<AddAttendance />} />
              <Route path='/Addassignment' element={<AddAssignment />} />
              <Route path='/Viewassignment' element={<Viewassignment />} />
            </Route>
          </Route>
           <Route 
            element={
              // Pass the required role name matching your Redux structure ("Teacher" or "1")
              <ProtectedRoute allowedRoles={["Student", "2"]} />
            }
          >
            {/* Nest the sidebar layout wrapper inside the role guard */}
            <Route element={<><StudentHeader /></>}>
              <Route path='/StudentHome' element={<StudentHome />} />
              <Route path='/Marklist' element={<Marklist />} />
              <Route path='/Myprofile' element={<Myprofile />} />
               <Route path='/Editstudentprofile/:id' element={<Editstudentprofile />} />
                <Route path='/Assignment' element={<Assignment />} />
            </Route>
          </Route>
           
        </Routes>
        <Footerpage />
      </BrowserRouter>
    </div>
  );
}

export default App;
