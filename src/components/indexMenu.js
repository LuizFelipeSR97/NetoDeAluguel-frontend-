import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignOut } from '../hooks/useSignOut';

export default function MenuComponent({userData, setUserData}){

    const [menuVisibility, setMenuVisibility] = useState('hidden');
    const navigate = useNavigate();

    function toggleMenu(){
        if (menuVisibility==='hidden'){
            setMenuVisibility('visible')
        } else {
            setMenuVisibility('hidden')
        }
    }

    async function logoff(){
        await SignOut(userData.user);
        navigate('/');
        setUserData({});
    }

return (
<>
    <Menu>
        <h2>Olá, <strong>{userData.user.name}</strong></h2>
        <a href={`/user/${userData.user.id}`}><h1>Minha Conta</h1></a>
        <a href={`/services/${userData.user.id}`}><h1>Minhas Solicitações</h1></a>
        <a href={`/messages/${userData.user.id}`}><h1>Minhas Mensagens</h1></a>
        <h1 onClick={logoff}>Sair da Conta</h1>
    </Menu>
    <BackgroundScreen onClick={toggleMenu}/>
</>
)}

const Menu = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
    background-color: red;
    height: 100vh;
    width: 350px;
    margin-top: 70px;
    background-color: #ECE8DD;
    color: #ce8680;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
    transition: 500s linear; 

    h1{
        margin-top: 40px;
        font-size: 30px;
        cursor: pointer;
    }

    h2{
        margin-top: 40px;
        font-size: 30px;
        color: gray;
        cursor: default;
        margin-bottom: 40px;
    }
`;

const BackgroundScreen = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: fixed;
`;