//import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  return (
    <div className={`App ${isDarkModeEnabled ? "dark-theme" : ""}`}>
      <TodoList
        onToggleDarkMode={toggleDarkMode}
        isDarkModeEnabled={isDarkModeEnabled}
      />
    </div>
  );
}

export default App;
