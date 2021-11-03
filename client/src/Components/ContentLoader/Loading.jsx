import PuffLoader from 'react-spinners/PuffLoader'
import loaderStyles from '../../Styles/loading.module.css'

const Loading = () => {
    return ( 
        <div className={loaderStyles.loadingWrapper}>
            <PuffLoader size={150}/>
            <p>Ładuje zawartość strony...</p>
        </div>
     );
}
 
export default Loading;