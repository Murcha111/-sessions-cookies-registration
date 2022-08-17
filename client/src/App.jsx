import logo from './logo.svg';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom'
import Main from './Main';
import Table from './components/DataTable';
import DataTable from './components/DataTable';

function App() {
  return (
    <>
    <Routes >
    <Route path="/" element={<Main />} />
    <Route path="/api/leads" element={<DataTable />} />
    
    </Routes>
    </>
  );
}

export default App;
