import { Container } from 'react-bootstrap';
function Footerpage(){
    return(
         <div className="pb-5"> {/* Padding prevents content from hiding behind footer */}
    

      {/* Floating fixed footer */}
      <footer className="fixed-bottom py-3 bg-dark text-white">
        <Container className="text-center">
          <span>©Student Management System 2026</span>
        </Container>
      </footer>
    </div>
    )
}
export default Footerpage