import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Header from "./components/header/Header"
import Register from "./components/auth/Register"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import CreateQualification from "./components/tutor/CreateQualification"
import MyProfile from "./components/tutor/MyProfile"
import ShowMyQualification from "./components/tutor/ShowMyQualification"
import UploadProfile from "./components/tutor/UploadProfile"
import ManageProfile from "./components/tutor/ManageProfile"
import UpdateSocials from "./components/tutor/UpdateSocials"
import ShowMySocials from "./components/tutor/ShowMySocials"
import PostATutorService from "./components/tutor/PostAtutorService"
import MyTutoringService from "./components/tutor/MyTutoringServices"
import ManageSubject from "./components/tutor/ManageSubject"
import TutorUpdateSubject from "./components/tutor/TutorUpdateSubject"
import TutorUpdateCommentary from "./components/tutor/TutorUpdateCommentary"
import TutorUpdateSubjectName from "./components/tutor/TutorUpdateSubjectName"
import TutorUpdateSubjectPrice from "./components/tutor/TutorUpdateSubjectPrice"
import TutorDeleteSubject from "./components/tutor/TutorDeleteSubject"
import DeleteQualification from "./components/tutor/DeleteQualification"
import Home from "./components/posts/Home"
import PersonProfile from "./components/posts/PersonProfile"
import SubjectsView from "./components/posts/SubjectsView"
import QualificationsView from "./components/posts/QualificationsView"
import PostSingle from "./components/posts/PostSingle"


function App() {
  return(<>
  <Router>
    <Header />
    <main className="py-3">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/create_qualification" element={<CreateQualification /> } />
          <Route path="/my_profile" element={<MyProfile />} />
          <Route path="/show_my_qualifications/:id" element={<ShowMyQualification />} />
          <Route path="/user_upload_profile/:id" element={<UploadProfile />} />
          <Route path="/manage_my_profile/:id" element={<ManageProfile /> } />
          <Route path="/user_update_socials/:id" element={<UpdateSocials />} />
          <Route path="/view_my_socials" element={<ShowMySocials />} />
          <Route path="/post_tutor_service" element={ <PostATutorService /> } />
          <Route path="/my_services" element={<MyTutoringService />} />
          <Route path="/manage_subject/:id" element={<ManageSubject />} />
          <Route path="/tutor_update_subject/:id" element={<TutorUpdateSubject />} /> 
          <Route path="/tutor_update_commentary/:id" element={<TutorUpdateCommentary />} />
          <Route path="/tutor_update_name/:id" element={<TutorUpdateSubjectName />} />
          <Route path="/tutor_update_price/:id" element={<TutorUpdateSubjectPrice />} />
          <Route path="/tutor_delete_subject/:id" element={<TutorDeleteSubject />} />
          <Route path="/delete_qualification/:id" element={<DeleteQualification />} />
          <Route path="/person_profile/:id" element={<PersonProfile />} />
          <Route path="/subjects_view/:id" element={<SubjectsView />} />
          <Route path="/qualifications_view/:id" element={<QualificationsView />} />
          <Route path="/post_single/:id" element={<PostSingle />} />
          


          </Routes>


      </div>


    </main>




  </Router>

  
  </>)
}

export default App