import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function MyAccountPage() {

    const { userData, setUserData } = useContext(UserContext);
    const [ form1Visibility, setForm1Visibility] = useState('hidden');
    const [ form2Visibility, setForm2Visibility] = useState('hidden');
    const [ form3Visibility, setForm3Visibility] = useState('hidden');

    function handleSubmit(e){
        e.preventDefault();

        if (e.target.id==='AccountInfo'){
            let info = {
                name: e.target.name.value,
                surname: e.target.surname.value,
                birthday: e.target.birthday.value,
                typeId: e.target.type.value,
                statusId: e.target.status.value
            }
            if (e.target.photo.value!=='') {info = {...info, photoUrl: e.target.photo.value} }
            e.target.name.value='';
            e.target.surname.value='';
            e.target.photo.value='';
            e.target.birthday.value='';
            e.target.type.value='';
            e.target.status.value='';
            setForm2Visibility('hidden');
            alert('Fazer o post dessas informações')
            console.log(info);
        } else if (e.target.id==='AccessInfo'){
            if (e.target.password.value !== e.target.passwordVerification.value){
                e.target.password.value = '';
                e.target.passwordVerification.value = '';
                alert('A senha e a confirmação devem ser iguais')
            }  else if (e.target.password.value.length<6) {
                e.target.password.value = '';
                e.target.passwordVerification.value = '';
                alert('A senha deve ter pelo menos 6 caracteres')
            } else {
                const info = {
                    email: e.target.email.value,
                    password: e.target.password.value
                }
                e.target.email.value='';
                e.target.password.value='';
                e.target.passwordVerification.value='';
                setForm2Visibility('hidden')
                console.log(info)
                alert('Fazer o post dessas informações')
            }    
        } else if (e.target.id==='AddressInfo') {
            const info = {
                country: e.target.country.value,
                state: e.target.state.value,
                city: e.target.city.value,
                district: e.target.district.value,
                street: e.target.street.value
            }
            if (e.target.name.value!=='') {info = {...info, name: e.target.name.value} }
            if (e.target.number.value!=='') {info = {...info, number: e.target.number.value} }
            if (e.target.complement.value!=='') {info = {...info, complement: e.target.complement.value} }
            e.target.name.value='';
            e.target.country.value='';
            e.target.state.value='';
            e.target.city.value='';
            e.target.district.value='';
            e.target.street.value='';
            e.target.number.value='';
            e.target.complement.value='';

            console.log(info);
            alert('Fazer o post dessas informações');
            setForm2Visibility('hidden');
        }
    }

    function toggleForms(id){
        if(id==="AccountInfo"){
            if(form1Visibility==='hidden'){
                setForm1Visibility('visible');
                setForm2Visibility('hidden');
                setForm3Visibility('hidden');
            } else {
                setForm1Visibility('hidden');
            }
        } else if(id==="AccessInfo"){
            if(form2Visibility==='hidden'){
                setForm1Visibility('hidden');
                setForm2Visibility('visible');
                setForm3Visibility('hidden');
            } else {
                setForm2Visibility('hidden');
            }
        } else if(id==="AddressInfo"){
            if(form3Visibility==='hidden'){
                setForm1Visibility('hidden');
                setForm2Visibility('hidden');
                setForm3Visibility('visible');
            } else {
                setForm3Visibility('hidden');
            }

        }
    }

    function birthdayInputStyle(e){
        const value= e.target.value;

        if (e.key==='Backspace'){
            if(e.target.value.length===3){
                e.target.value = `${value.slice(0,-1)}`;
            } if(e.target.value.length===6){
                e.target.value = `${value.slice(0,-1)}`;
            }
        } else if (e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== '0'){
            e.target.value = value.slice(0,-1);
        } else {
            if (e.target.value.length===2 && Number(value)>31){
                e.target.value = '31'
            } else if(e.target.value.length===3){
                e.target.value = `${value.slice(0,2)}/${value.slice(2,3)}`;
            } if (e.target.value.length===5 && Number(value.slice(3,5)>12)){
                e.target.value = value.slice(0,3)+'12';
            } else if(e.target.value.length===6){
                e.target.value = `${value.slice(0,5)}/${value.slice(5,6)}`;
            }
        }
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                <h1>Informações do usuário</h1>
                <div className='title'><h3>Dados da Conta </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AccountInfo")}/></div>
                {(form1Visibility === 'hidden') ? <></> :
                <Form id="AccountInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>Nome:</h2>
                        <h2>Sobrenome:</h2>
                        <h2>Foto:</h2>
                        <h2>Data de nascimento:</h2>
                        <h2>Tipo de conta:</h2>
                        <h2>Status:</h2>
                    </div>
                    <div className='right'>
                        <input type='text' name='name' placeholder='Ex: João' required/>
                        <input type='text' name='surname' placeholder='Ex: das Couves' required/>
                        <input type='file' name='photo'/>
                        <input type='text' name='birthday' placeholder='Ex: 31/12/1900' required maxLength="10" onKeyUp={birthdayInputStyle}/>
                        <input type='text' name='type' placeholder='Colocar a lista de opções aqui' required/>
                        <input type='text' name='status' placeholder='Colocar a lista de opções aqui' required/>
                    </div>
                    <Button>Salvar 1</Button>
                </Form>}
                <div className='title'><h3>Dados de Acesso </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AccessInfo")}/></div>
                {(form2Visibility === 'hidden') ? <></> :
                <Form id="AccessInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>E-mail:</h2>
                        <h2>Senha:</h2>
                        <h2>Confirmação da senha:</h2>
                    </div>
                    <div className='right'>
                        <input type='email' name='email' placeholder='Ex: joao-das-couves@gmail.com'/>
                        <input type='password' name='password'/>
                        <input type='password' name='passwordVerification'/>
                    </div>
                <Button>Salvar 2</Button>
                </Form>}
                <div className='title'><h3>Dados de Endereço </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AddressInfo")}/></div>
                {(form3Visibility === 'hidden') ? <></> :
                <Form id="AddressInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>Apelido:</h2>
                        <h2>País:</h2>
                        <h2>Estado:</h2>
                        <h2>Cidade:</h2>
                        <h2>Bairro:</h2>
                        <h2>Endereço:</h2>
                        <h2>Número:</h2>
                        <h2>Complemento:</h2>
                    </div>
                    <div className='right'>
                        <input type='text' name='name' placeholder='Ex: Casa'/>
                        <input type='text' name='country' placeholder='Ex: Brasil' required/>
                        <input type='text' name='state' placeholder='Ex: Tocantins' required/>
                        <input type='text' name='city' placeholder='Ex: Palmas' required/>
                        <input type='text' name='district' placeholder='Ex: Centro' required/>
                        <input type='text' name='street' placeholder='Ex: Rua das Flores' required/>
                        <input type='text' name='number' placeholder='Ex: 150'/>
                        <input type='text' name='complement' placeholder='Ex: Apartamento 804'/>
                    </div>
                <Button>Salvar 3</Button>
                </Form>}
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
    height: 823px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .left{
        width: 35%;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: 700;
        margin-top: 8px;
    }

    .right{
        width: 50%;
        margin-left: 20px;
    }

    h1{
        font-size: 30px;
        font-weight: 700;
        margin-top: 30px;
        margin-bottom: 50px;
    }

    h3{
        font-size: 20px;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 30px;
        margin-left: 50px;
    }

    ion-icon{
        font-size: 28px;
        font-weight: 700;
        margin-top: 15px;
        margin-left: 50px;
        cursor: pointer;
    }

    h2{
        font-size: 20px;
        margin-bottom: 30px;
    }

    .title{
        display: flex;
    }

    input{
        width: 400px;
        height: 35px;
        margin-bottom: 15px;
        padding-left: 15px;
        border-radius: 5px;
        border: 1px solid #bcbdbf;
        font-size: 20px;

        ::placeholder{
            font-size: 16px;
        }
    }
`;

const Button = styled.button`
    background-color: #d8d8d8;
    font-size: 15px;
    padding: 5px 20px;
    border: 1px solid #BCBDBF;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    right: 550px;

    :hover{
        background-color: #BCBDBF;
    }
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    padding-bottom: 50px;
`;
