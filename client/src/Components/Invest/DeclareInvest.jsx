import styles from '../../Styles/investAmount.module.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(() => ({
    backgroundColor: 'white',
    borderColor: '#6cc644',
    color: '#6cc644',
    '&:hover': {
      borderColor: '#6cc644',
    }
  }));

const DeclareInvest = ({ isValidationOn, amountAccepted, emailAccepted, investAmount, investorEmail, setAmount, setEmail, nextStep }) => {
    return ( 
        <div className={styles.declareWrapper}>
            <h2>Chcesz zainwestować w ten projekt?</h2>
            <label>Ile chcesz zainwestować?</label>
            <input type="text" value={investAmount} onChange={setAmount} />
            { isValidationOn ? amountAccepted ? null : <span>Wartość musi być liczbą z zakresu od 0.10zł do 2500zł</span> : null }
            <label>Adres email</label>
            <input type="text" value={investorEmail} onChange={setEmail} />
            { isValidationOn ? emailAccepted ? null : <span>Pole nie spełnia wymagań pola email</span> : null }
            <ColorButton variant='outlined' onClick={nextStep}>Przjedź do podsumowania</ColorButton>
        </div>
     );
}
 
export default DeclareInvest;