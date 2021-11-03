import styles from '../../Styles/investAmount.module.css'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { AppContext } from '../../Context/AppContext';

const ColorButton = styled(Button)(() => ({
    backgroundColor: 'white',
    borderColor: '#6cc644',
    color: '#6cc644',
    '&:hover': {
      borderColor: '#6cc644',
    }
  }));

const SubmitInvest = ({investAmount, investorEmail, projectData}) => {

    const { handleMustRefresh } = useContext(AppContext)

    const [isValidationOn, setIsValidationOn] = useState(false)

    const [correctData, setCorrectData] = useState(false)
    const handleToggleCorrectData = (e) => {
      setCorrectData(e.target.checked)
    }

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsValidationOn(true)
        if(correctData) {
            const newInvestorObject = {
                projectID: projectData.id,
                investAmount,
                investorEmail
            }
            fetch('http://localhost:5000/saveInvestorData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInvestorObject)
            })
            .then(() => {
                handleMustRefresh()
                setIsFormSubmitted(true)
            })
        }
    }

    return ( 
        <>
        { isFormSubmitted ? <Redirect to='/' /> : null}
        <form className={styles.declareWrapper} onSubmit={handleSubmitForm}>
            <h2>Podsumowanie inwestycji</h2>
            <p><AttachMoneyIcon /> {investAmount}zł</p>
            <p><AlternateEmailIcon /> {investorEmail}</p>
            <label>
            <input type="checkbox" checked={correctData ? true : false} onChange={handleToggleCorrectData}/>
            Potwierdzam iż powyższe dane są prawidłowe
            </label>
            { isValidationOn ? correctData ? null : <span>Aby kontynuować potwierdź że dane są prawdziwe</span> : null }
            <ColorButton type='submit' variant='outlined'>Zainwestuj</ColorButton>
        </form>
        </>
     );
}
 
export default SubmitInvest;