import { Container } from "react-bootstrap"
import About from "./About"
import CarouselPage from "./Carouselpage"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){

    return(

        <>
         <CarouselPage/>
        <Container>

            <h1 className="text-primary fw-bold text-center my-4">Cloud-based school management software to support schools across the Middle East</h1>
            <h5 className="text-warning fw-bold text-center my-4">With a single core database accessible through our suite of online portals and apps for parents, students and staff, SMS gives schools bespoke management of all academic, wellbeing, cultural, administrative and financial information.</h5>
       
       
       
   <Row className="align-items-center">
        
        {/* Left Side: The Image Column */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            width={400}
            height={400}
            alt="Future Trends in Student Management Systems"
            src="https://www.iitms.co.in/blog/img/student-management-systems-trends-and-predictions-for-the-next-decade-info-l.webp"
            fluid // Keeps image responsive
            rounded // Soft rounded corners
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">Future Trends in Student Management Systems</h2>
          <p className="text-muted mb-4">
            An overview of the emerging technological shifts and operational methodologies 
            transforming educational administration platforms:
          </p>
          
          {/* List layout mimicking the infographic points */}
          <ul className="list-unstyled lh-lg">
            <li><strong>1.</strong> Increased Utilisation of Cloud-Based Solutions</li>
            <li><strong>2.</strong> Improved Student Support Services</li>
            <li><strong>3.</strong> Determine at-risk students</li>
            <li><strong>4.</strong> Enhanced Organisational Operation</li>
            <li><strong>5.</strong> Improved Personalised Learning Experiences</li>
            <li><strong>6.</strong> Artificial Intelligence And Predictive Analytics Integration</li>
            <li><strong>7.</strong> Continuous Professional Development (CPD)</li>
          </ul>
        </Col>

      </Row>
        </Container>
        </>
    )
}
export default Home