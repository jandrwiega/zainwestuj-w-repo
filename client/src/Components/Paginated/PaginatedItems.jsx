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

      return ( 
        <div className={paginatedStyles.repoWrapper}>
            <h2>Nazwa Repozytorium: {data.name}</h2>
            <h3>Autor: {data.owner.login}</h3>
            <span>Trochę informacji o repozytorium</span>
            <p>{data.description}</p>
            <Link to={`/inwestuj/${data.id}`} className={paginatedStyles.button}><ColorButton variant="outlined" color='secondary'>Zainwestuj</ColorButton></Link>
            <div className={paginatedStyles.investorsList}>
              <div className={paginatedStyles.investorsListHeader}>
                <p>Liczba inwestorów: <b>{3}</b></p>
                <p>Suma zainwestowanych środków: <b>{200}zł</b></p>
              </div>
              <div className={paginatedStyles.toggleVisibilityList} onClick={handleToggleIsInvestorListVisible}>
                { isInvestorListVisible ? <><RemoveIcon />Ukryj listę inwestorów</> : <><AddIcon />Pokaż listę inwestorów</> }
              </div>
              <div className={paginatedStyles.investorsListDonations}>

              </div>
            </div>
        </div>
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