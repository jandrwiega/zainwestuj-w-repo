import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ReactPaginate from 'react-paginate';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import paginatedStyles from '../../Styles/paginated.module.css'
import '../../Styles/preStyledPaginated.css'

import Loading from "../ContentLoader/Loading";

  const Items = ({ currentItems }) => {
    return (
      <>
        {currentItems && currentItems.map((item) => <DisplayItems key={item.id} data={item}/>)}
      </>
    );
  }

  const DisplayItems = ({ data }) => {

    const { investorsList } = useContext(AppContext)

    const ColorButton = styled(Button)(() => ({
      backgroundColor: 'white',
      borderColor: '#6cc644',
      color: '#6cc644',
      '&:hover': {
        borderColor: '#6cc644',
      }
    }));

    const [isInvestorListVisible, setIsInvestorListVisible] = useState(false)
    const handleToggleIsInvestorListVisible = () => {
      setIsInvestorListVisible(!isInvestorListVisible)
    }

    const [repoInvestorsList, setRepoInvestorsList] = useState([])
    useEffect(() => {
      const getInvestorsArray = []

      for(let i = 0; i < investorsList.length; i++) {
        if(investorsList[i].projectID === data.id) {
          getInvestorsArray.push(investorsList[i])
        }
      }
      setRepoInvestorsList(getInvestorsArray)
      // eslint-disable-next-line
    }, [investorsList])

    const handleDisplatInvestAmount = () => {
      let sum = 0;
      for(let s = 0; s<repoInvestorsList.length; s++) {
        sum = sum + parseFloat(repoInvestorsList[s].investAmount)
      }
      return sum
    }

      return ( 
        <div className={paginatedStyles.repoWrapper}>
            <h2>Nazwa Repozytorium: {data.name}</h2>
            <h3>Autor: {data.owner.login}</h3>
            <span>Trochę informacji o repozytorium</span>
            <p>{data.description}</p>
            <Link to={`/inwestuj/${data.id}`} className={paginatedStyles.button}><ColorButton variant="outlined" color='secondary'>Zainwestuj</ColorButton></Link>
           
            { repoInvestorsList.length === 0 ? <p>Nikt jeszcze nie zainwestował w to repozytorium, możesz być pierwszy</p> :  
            <div className={paginatedStyles.investorsList}>
              <div className={paginatedStyles.investorsListHeader}>
                <p>Liczba inwestorów: <b>{repoInvestorsList.length}</b></p>
                <p>Suma zainwestowanych środków: <b>{handleDisplatInvestAmount()}zł</b></p>
              </div>
              <div className={paginatedStyles.toggleVisibilityList} onClick={handleToggleIsInvestorListVisible}>
                { isInvestorListVisible ? <><RemoveIcon />Ukryj listę inwestorów</> : <><AddIcon />Pokaż listę inwestorów</> }
              </div>
              {isInvestorListVisible ?
              <div className={paginatedStyles.investorsListDonations}>
                { repoInvestorsList.map((investor, i) => <DisplayInvestorRow key={i} data={investor}/>) }
              </div> : null }
            </div> }
            
        </div>
       );
  }

  const DisplayInvestorRow = ({data}) => {

    console.log(data);

    return ( 
      <ul>
        <li>{data.investAmount}zł</li>
        <li>{data.investorEmail}</li>
      </ul>
     );
  }

  
  const PaginatedItems = ({ itemsPerPage }) => {

    const { repoList, isRepoListLoaded, lastPageOpened, handleSetLastPageOpened } = useContext(AppContext)
    const [currentItems, setCurrentItems] = useState(repoList);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(lastPageOpened * itemsPerPage);
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(repoList.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(repoList.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, repoList]);
  
    const handlePageClick = (e) => {
      const newOffset = (e.selected * itemsPerPage) % repoList.length;
      setItemOffset(newOffset);
      handleSetLastPageOpened(e.selected)
    };
  
    return (
      <>
        { isRepoListLoaded ? <> 
        <div className={paginatedStyles.resultsWrapper}>
          <Items currentItems={currentItems} />
        </div>
        <div className={paginatedStyles.navigator}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={lastPageOpened}
          />
        </div></> : <Loading /> }
      </>
    );
  }

  export default PaginatedItems;