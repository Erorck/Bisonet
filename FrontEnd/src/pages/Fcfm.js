import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer';
import { LatestNews } from '../components/LatestNews';
import { UpcommingEvents } from '../components/UpcommingEvents';
import '../css/uanl.css'
import '../css/index.css'

function FcfmPage() {
    return (
        <div className='MainPage'>
            <UpperMenu />
            <div className="HeadCarousel">
                <div className='CarouselMessage'>
                    <span>Alumnos desarrollan BISONET</span>
                </div>
                <CarouselFade />
            </div>
            <div className='BodyContent'>
                <div className='BodyHeader'>
                    <span>Bienvenido a FCFM</span>
                </div>
                <LatestNews />
                <UpcommingEvents />
            </div>
            <Footer />
        </div>
    )
}

export default FcfmPage;