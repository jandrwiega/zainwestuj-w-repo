import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import investStyles from '../../Styles/invest.module.css'
import Loading from "../ContentLoader/Loading";

const ColorButton = styled(Button)(() => ({
    backgroundColor: 'white',
    borderColor: '#6cc644',
    color: '#6cc644',
    '&:hover': {
      borderColor: '#6cc644',
    }
  }));

const Invest = () => {

    let { id } = useParams()
    const history = useHistory()
    const { repoList, isRepoListLoaded } = useContext(AppContext)

    const [repoItem, setRepoItem] = useState({})
    useEffect(() => {
        for(let i = 0; i < repoList.length; i++) {
            // eslint-disable-next-line
            if(repoList[i].id == id) {
                setRepoItem(repoList[i])
            }
        }
    }, [id, repoList])

    useEffect(() => {
        console.log(repoItem);
    }, [repoItem])

    return ( 
        <>
            { isRepoListLoaded ? <> 
                <ColorButton variant='outlined' className={investStyles.goBackBtn} onClick={history.goBack}><ArrowBackIcon /> Powrót do listy</ColorButton>
                <h1>Inwestuj w {id}</h1>
                <h2>{ repoItem.id }</h2>
            </> : <Loading /> }
        </>
     );
}
 
export default Invest;