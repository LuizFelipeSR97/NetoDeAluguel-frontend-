import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { GetUserInfo } from '../../hooks/useGetUserInfo';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function ServiceInfoPage() {

    useEffect(()=>{
        getUserInfo();
    },[]);

    const { id } = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const [userProfileData, setUserProfileData] = useState({});
    console.log(userData);
    console.log(userProfileData);

    async function getUserInfo(){
        const response = await GetUserInfo(id);
        setUserProfileData(response)
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                PAGINA DE UM SERVICE ESPECIFICO
            </Content>
            <BottomBarComponent />
        </Page>
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

const Content = styled.div`
    background-color: #F3F3F3;
    width: 1200px;
    height: 850px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .photo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
        margin-top: 20px;

        img{
            justify-content: center;
            width: 200px;
            border: 1px solid #cecece;
            margin-top: 50px;
        }
    }

    .info{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .left{
        width: 40%;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: 700;
    }

    .right{
        width: 40%;
        margin-left: 10px;
    }

    h1{
        font-size: 30px;
        font-weight: 700;
    }

    h2{
        font-size: 20px;
        margin-bottom: 10px;
    }
`;
