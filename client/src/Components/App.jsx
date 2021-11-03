import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PaginatedItems from './Paginated/PaginatedItems'
import Invest from "./Invest/Invest";

const App = () => {



    return ( 
        <Router>
        <div className="wrapper">
            <Switch>
                <Route exact path='/'>
                    <PaginatedItems itemsPerPage={10}/>
                </Route>

                <Route exact path='/inwestuj/:id'>
                    <Invest />
                </Route>
            </Switch>
        </div>
        </Router>
     );
}
 
export default App;