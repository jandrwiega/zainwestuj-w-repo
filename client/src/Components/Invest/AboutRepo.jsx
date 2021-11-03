import styles from '../../Styles/aboutRepo.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import investStyles from '../../Styles/invest.module.css'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import LinkIcon from '@mui/icons-material/Link';

const ColorButton = styled(Button)(() => ({
    backgroundColor: 'white',
    borderColor: '#6cc644',
    color: '#6cc644',
    '&:hover': {
      borderColor: '#6cc644',
    }
  }));

const AboutRepo = ({ repo }) => {

    const history = useHistory()

    return ( 
        <div className={styles.aboutRepo}>
            <ColorButton variant='outlined' className={investStyles.goBackBtn} onClick={history.goBack}><ArrowBackIcon /> Powrót do listy</ColorButton>
            <div className={styles.repoDetails}>
                <h2>Nazwa Repozytorium: {repo.name}</h2>
                <h3>Autor: {repo.owner === undefined ? '' : repo.owner.login}</h3>
                <span>Trochę informacji o repozytorium</span>
                <p>{repo.description}</p>

                <p><LinkIcon /><a href={repo.url} target='_blank' rel="noreferrer">Link do projektu</a></p>
            </div>
        </div>
     );
}
 
export default AboutRepo;