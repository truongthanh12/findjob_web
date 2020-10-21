import React from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import DescriptionJob from "./components/DescriptionJob";
import JobList from "./components/JobList";
import JobListPage from "./components/JobListPage";
import PostJobForm from "./components/Form/PostJobForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/Form/LoginForm";
import Register from "./components/Form/Register";

function App() {
  return (
    <div className="site-wrap">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={JobList} />
          <Route path="/about" exact component={About} />
          <Route path="/job-listing" exact component={JobListPage} />
          <Route path="/post-a-job" exact component={PostJobForm} />
          <Route path="/job-detail" exact component={DescriptionJob} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" exact component={Register} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
