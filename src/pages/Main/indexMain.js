import { useContext, useState } from 'react';
import styled from "styled-components";
import ad from '../../assets/images/ad.png';
import info from '../../assets/images/infoEmpresa2.png';
import UserContext from '../../contexts/UserContext';
import { SignOut } from '../../hooks/useSignOut';

export default function MainPage() {

    const { userData, setUserData } = useContext(UserContext);
    console.log(userData);

    const [menuVisibility, setMenuVisibility] = useState('hidden');

    function toggleMenu(){
        if (menuVisibility==='hidden'){
            setMenuVisibility('visible')
        } else {
            setMenuVisibility('hidden')
        }
    }

    async function logoff(){
        await SignOut(userData.user);
        setUserData({});
    }

    return (
        <>
            <Page>
                {menuVisibility==='visible' ?
                    <>
                        <Menu>
                            {!userData.user ?  
                            <>
                                <a href={"/sign-in"}><h1>Fazer Login</h1></a>
                                <a href={"/sign-up"}><h1>Cadastrar</h1></a>
                            </>
                            : 
                            <>
                                <h2>Olá, <strong>{userData.user.name}</strong></h2>
                                <a href={"/my-account"}><h1>Minha Conta</h1></a>
                                <a href={"/my-services"}><h1>Minhas Solicitações</h1></a>
                                <a href={"/my-messages"}><h1>Minhas Mensagens</h1></a>
                                <h1 onClick={logoff}>Sair da Conta</h1>
                            </>}
                        </Menu>
                        <BackgroundScreen onClick={toggleMenu}/>
                    </>
                    :
                    <></>
                }
                <TopBar>
                    <ContentBar>
                        <ion-icon name="menu-outline" onClick={toggleMenu}/>
                    </ContentBar>
                </TopBar>
                <Content>
                    <div className="info"><img src={info}/></div>
                    <div className="ad"><img src={ad}/></div>
                </Content>
                <BottomBar>
                    <ContentBottomBar>
                            <h2>© Copyright 2023 Neto de Aluguel | Freepik - Flaticon</h2>
                            <div className="links">
                            <a href={"/aboutUs"}><h1>Quem Somos</h1></a><h1>|</h1><a href={"/privacyPolicy"}><h1>Política de privacidade</h1></a><h1>|</h1><a href={"/contactUs"}><h1>Fale conosco</h1></a>
                            </div>
                    </ContentBottomBar>
                </BottomBar>
            </Page>
        </>
    )
}

const Page = styled.div`
    background-color: #EDEDED;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a:-webkit-any-link {
        text-decoration: none;
    }
`;

const TopBar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 70px;
    width: 100%;
    background-color: #E1D7C6;
    display: flex;
    justify-content: center;
    z-index: 3;

    img{
        width: 50px;
        margin-left: 20px;
        cursor: pointer;
    }
`;

const ContentBar = styled.div`
    width: 1200px;
    display: flex;
    align-items: center;
    position: relative;
    color: #ce8680;

    ion-icon{
        color: white;
        font-size: 40px;
        margin-right: 30px;
        position: absolute;
        right: 0px;
        cursor: pointer;
    }

    input{
        width: 300px;
        height: 40px;
        background: white;
        border-radius: 5px;
        border: 1px solid #ffffff;
        position: absolute;
        right: 150px;
        padding-left: 15px;
        color: black;
        font-size: 18px;
        z-index:1;
    }

    h1{
        margin-bottom: 8px;
        font-weight: 700;
    }

    h2{
        margin-bottom: 8px;
        font-weight: 400;
    }
`;

const Content = styled.div`
    background-color: #F3F3F3;
    width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .ad{
        margin-top: 40px;
        margin-bottom: 40px;
        width: 1000px;
        height: 150px;
        background-color: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        img{
            width: 100%;
            height: 100%;
        }
    }

    .info{
        margin-top: 40px;
        margin-bottom: 40px;
        width: 1000px;
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            width: 100%;
            height: 100%;
            border-radius: 25px;
        }
    }
`;

const BackgroundScreen = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: fixed;
`;

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

const BottomBar = styled.div`
    height: 80px;
    width: 100%;
    background-color: #579BB1;
    display: flex;
    justify-content: center;
    z-index: 1;
`;

const ContentBottomBar = styled.div`
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    color: #FFFFFF;

    img{
        position: absolute;
        left: 30px;
        top: 5px;
        width: 60px;
        cursor: pointer;
    }

    ion-icon{
        color: white;
        font-size: 40px;
        margin-right: 30px;
        position: absolute;
        right: 0px;
        cursor: pointer;
    }

    h1{
        font-size: 15px;
        margin-left: 10px;
    }

    h2{
        margin-left: 120px;
        margin-bottom: 10px;
        font-size: 10px;
    }

    .links{
        margin-right: 20px;
        margin-bottom: 10px;
        display: flex;
        cursor: pointer;
    }
`;
