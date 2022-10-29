import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer';
import { LatestNews } from '../components/LatestNews';
import { UpcommingEvents } from '../components/UpcommingEvents';
import { FragmentNav } from '../Tabs/FragmentNav';
import '../css/lmad.css';
import '../css/index.css';
import '../css/uanl.css';

function LmadPage() {
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
                    <span>Bienvenido a LMAD</span>
                </div>
                <FragmentNav />
            </div>
            <Footer />
        </div>
    )
}

export default LmadPage;