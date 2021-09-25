import{BrowserRouter as Router,Route} from 'react-router-dom'
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
function App() {
  return (
    <div >
     
     <Router>
       <Route path="/Chat" component={Chat}/>
        <Route path="/" exact component={Join}/>
     </Router>
    </div>
  );
}

export default App;
