import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./screens/Main";
import SearchScreen from "./screens/Search";
import SurveyModal from "./components/SurveyModal";

function App() {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyTimer, setSurveyTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [delay, setDelay] = useState(10000);
  const deferTime = 10000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSurveyModalOpen(true);
    }, delay);

    setSurveyTimer(timer);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleCloseSurveyModal = () => {
    setIsSurveyModalOpen(false);
    if (surveyTimer) {
      clearTimeout(surveyTimer);
    }
    const newTimer = setTimeout(() => {
      setIsSurveyModalOpen(true);
    }, delay);
    setSurveyTimer(newTimer);
  };

  const handleDeferSurveyModal = () => {
    setIsSurveyModalOpen(false);
    if (surveyTimer) {
      clearTimeout(surveyTimer);
    }
    const newDelay = delay + deferTime;
    setDelay(newDelay);
    const newTimer = setTimeout(() => {
      setIsSurveyModalOpen(true);
    }, newDelay);
    setSurveyTimer(newTimer);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/search" element={<SearchScreen />} />
      </Routes>
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={handleCloseSurveyModal}
        onDefer={handleDeferSurveyModal}
      />
    </Router>
  );
}

export default App;
