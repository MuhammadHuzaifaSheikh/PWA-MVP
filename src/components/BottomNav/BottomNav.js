import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { setIsHomeActive, setIsTodoActive, setIsInstaActive } from '../../store/Slices/BottomSlice'
import '../../index.css'


function BottomNav() {
    const dispatch = useDispatch();
    const { isHomeActive, isInstaActive, isTodoActive } = useSelector((state) => state.bottom);

    const handleHomeClick = () => {
        dispatch(setIsHomeActive(true));
        dispatch(setIsTodoActive(false));
        dispatch(setIsInstaActive(false));
    }

    const handleTodoClick = () => {
        dispatch(setIsHomeActive(false));
        dispatch(setIsTodoActive(true));
        dispatch(setIsInstaActive(false));
    }

    const handleInstaClick = () => {
        dispatch(setIsHomeActive(false));
        dispatch(setIsTodoActive(false));
        dispatch(setIsInstaActive(true));
    }
    return (
        <div className="bottom-nav">
            <Link to="/">
                <div onClick={handleHomeClick} className={`bottom-nav-item ${isHomeActive && 'active'} `}>
                    <HomeOutlinedIcon />
                    <span>Home</span>
                </div>
            </Link>
            <Link to="/todos">
                <div onClick={handleTodoClick} className={`bottom-nav-item ${isTodoActive && 'active'} `}>
                    <ListAltIcon />
                    <span>To-Dos</span>
                </div>
            </Link>
            <Link to="/instascreen">
                <div onClick={handleInstaClick} className={`bottom-nav-item ${isInstaActive && 'active'} `}>
                    <PermIdentityIcon />
                    <span>Posts</span>
                </div>
            </Link>
        </div>
    );
}


export default BottomNav;
