import React, {useState, useEffect} from 'react'
import Toggle from "react-toggle"
import "react-toggle/style.css"

const ToggleTheme = () => {
    const [isDark, setIsDark] = useState (JSON.parse(localStorage.getItem("darkTheme")) || false)

    useEffect(() => {
        if(isDark){
            const darkTheme = document.getElementById('darkTheme');
            darkTheme.classList.add("dark");
            localStorage.setItem('darkTheme', JSON.stringify(!isDark));
        } else {
            const darkTheme = document.getElementById('darkTheme');
            darkTheme.classList.remove("dark");
        }
        localStorage.setItem("darkTheme", isDark)
    }, [isDark]);
    // if(isDark === false){
    //     const darkTheme = document.getElementById('darkTheme');
    //     darkTheme.classList.remove("dark");
    // } 
    return (
        <div className="darkToggle">
            <Toggle
                className="DarkToggle"
                checked={isDark}
                onChange={event => setIsDark(event.target.checked)}
                icons={{ checked: "🌙", unchecked: "🔆" }}
                aria-label="Dark mode"
            />
        </div>
      );
}

export default ToggleTheme
