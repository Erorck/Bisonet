import logo from '../resources/LogoLight.png';
import { useNavigate } from 'react-router-dom';
import '../css/index.css'

function AdminMenu() {

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
                            navigate("/administrar-publicaciones")
                        }}>Publicaciones</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/administrar-grupos")
                        }}>Grupos</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/administrar-materias")
                        }}>Materias</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            navigate("/reportes")
                        }}>Reportes</button>
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

export default AdminMenu;