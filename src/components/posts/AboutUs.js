import Bg from "./bg.jpg"
function AboutUs() {
    return(<div className="container">
        <div class="row">
      <div class="col-md-8">
      <h1>About Tutor Finder</h1>
        <p>Welcome to our platform, where tutors connect with students in pursuit of educational excellence.
             At Tutor Finder, we provide a dynamic and user-friendly space for tutors to showcase their expertise
              and for students to discover the perfect match for their learning needs. </p>
              
             <p> Whether you're an experienced tutor looking to expand your reach or a student seeking 
              personalized academic guidance, our platform is designed to facilitate seamless connections and
               foster meaningful learning experiences.</p>


               <p>

               As a tutor on our platform, you can create a comprehensive profile that highlights your 
               skills, qualifications, and teaching style. 
               Showcase your areas of expertise, share testimonials from satisfied students, and set your own rates and availability.
                Our advanced search and matching algorithms ensure that students can easily find tutors 
                who align with their specific needs, making the process efficient and rewarding.

               </p>

               <p>


               For students, our platform offers a wide range of tutor profiles to explore. 
               Whether you're preparing for exams,
                seeking help with a challenging subject,
                 or looking to develop new skills, you'll find a diverse pool of knowledgeable 
                 tutors ready to guide you on your educational journey.
                Browse through profiles, read reviews, 
                and connect with tutors who can provide the personalized attention and expertise you're looking for.                
               </p>

               <p>


               We are dedicated to creating a safe and secure online environment. 
               We carefully review and verify the qualifications of our tutors,
                and we encourage students to provide feedback and ratings to ensure transparency and accountability.

               </p>




      </div>

      <div className="col-md-4 right-align-image" style={{textAlign: "right"}}>
        <img src={Bg} alt="bfg" style={{maxWidth: "100%", height: "auto"  }} />
      </div>


</div>
    
    
    </div>)
}

export default AboutUs