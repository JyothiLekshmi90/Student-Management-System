import { Container, Row, Col } from "react-bootstrap"
import Image from 'react-bootstrap/Image';
import CarouselPage from "./Carouselpage"

function About(){

    return(

        <>
        <h1 className="text-primary fw-bold text-center my-4">ABOUT US</h1>
        <Container>
             
               <Row className="align-items-center">
        
        {/* Left Side: The Image Column */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            width={400}
            height={400}
            alt="Future Trends in Student Management Systems"
            src="https://5.imimg.com/data5/SELLER/Default/2025/3/497143935/ER/PE/OU/218345128/student-management-services.png"
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
export default About