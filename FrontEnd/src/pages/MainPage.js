import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer'

function MainPage() {
    return (
        <div className="MainPage">
            <UpperMenu />
            <div className="MainCarousell">
                <div className="WelcomeMessage">
                    <span>Bienvenido a BISONET</span>
                </div>
                <CarouselFade/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage;