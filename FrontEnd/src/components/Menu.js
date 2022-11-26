import logo from '../resources/LogoLight.png';
import { useNavigate } from 'react-router-dom';
import '../css/index.css'

function UpperMenu() {

    let navigate = useNavigate();

    return (
        <div className="UpperTab" id="MenuSpace">
            <div className="Logo">
                <img src={logo} alt="AppLogo"></img>
            </div>
            <div className="MenuOptions">
                <ul>
                    <li>
                        <button onClick={() => {
                            navigate("/")
                        }}>Inicio</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/uanl")
                        }}>Uanl</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/fcfm")
                        }}>Fcfm</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/lmad")
                        }}>Lmad</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/perfil")
                        }}>Perfil</button>
                    </li>
                </ul>
            </div>
            <div className='ProfileHolder'>
                <div>
                    <button onClick={() => {
                        navigate("/login")
                    }}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    )
}

export default UpperMenu;