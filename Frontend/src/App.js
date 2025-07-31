import './App.css';
import Chat from './components/Chat';
import ConsumerMetrics from './components/ConsumerMetrics';
import CountriesAnalytics from './components/CountriesAnalytics';
import CustomerAnalytics from './components/CustomerAnalytics';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-analytics" element={<CustomerAnalytics />} />
        <Route path="/countries-analytics" element={<CountriesAnalytics />} />
        <Route path="/consumer-metrics" element={<ConsumerMetrics />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
