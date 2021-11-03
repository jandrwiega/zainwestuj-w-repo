import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

import Loading from "../ContentLoader/Loading";
import AboutRepo from "./AboutRepo";
import DeclareInvest from "./DeclareInvest";
import SubmitInvest from "./SubmitInvest";

const Invest = () => {

    let { id } = useParams()
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

    const [investAmount, setInvestAmount] = useState('')
    const [investAmountAccepted, setInvestAmountAccepted] = useState(false)
    const handleSetInvestAmount = (e) => {
        const value = e.target.value;
        setInvestAmount(value)
        const regex = /(^[0-9]{1}[0-9.]{0,5}[0-9]{1}$)/
        if(regex.test(value) && value >= 0.1 && value <= 2500) {
            setInvestAmountAccepted(true)
        }   else {
            setInvestAmountAccepted(false)
        }
    }

    const [investorEmail, setInvestorEmail] = useState('')
    const [investorEmailAccepted, setInvestorEmailAccepted] = useState(false)
    const handleSetInvestorEmail = (e) => {
        const value = e.target.value;
        setInvestorEmail(value)
        // eslint-disable-next-line
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(regex.test(value)) {
            setInvestorEmailAccepted(true)
        }   else {
            setInvestorEmailAccepted(false)
        }
    }

    const [isAmountDeclared, setIsAmountDeclared] = useState(false)
    const [isValidationOn, setIsValidationOn] = useState(false)
    const handleGoToSummary = () => {
        if(!isValidationOn) {
            setIsValidationOn(true)
        }
        if(investAmountAccepted && investorEmailAccepted) {
            setIsAmountDeclared(true)
        }
    }

    return ( 
        <>
            { isRepoListLoaded ? <> 
                <AboutRepo repo={repoItem}/>
                { isAmountDeclared ?
                    <SubmitInvest projectData={repoItem} investAmount={investAmount} investorEmail={investorEmail}/>
                    : 
                    <DeclareInvest isValidationOn={isValidationOn} amountAccepted={investAmountAccepted} emailAccepted={investorEmailAccepted} investAmount={investAmount} investorEmail={investorEmail} setAmount={handleSetInvestAmount} setEmail={handleSetInvestorEmail} nextStep={handleGoToSummary}/>
                }
            </> : <Loading /> }
        </>
     );
}
 
export default Invest;