import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import DescriptionJob from "./components/DescriptionJob";
import JobListPage from "./components/JobListPage";
import PostJobForm from "./components/Form/PostJobForm";
import LoginForm from "./components/Form/LoginForm";
import Register from "./components/Form/Register";
import RegisterUser from "./components/Form/RegisterUser";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import ApplyList from "./components/ApplyList";
import Home from "./components/Home";
import PostedJob from "./components/PostedJob";
import DescriptionJobPosted from "./components/DescriptionJobPosted";
import JobApplied from "./components/JobApplied";
import ThemeDark from "./components/themeBg/ThemeDark";
import LoadingApp from "./components/skeleton/LoadingApp";

function App() {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1200);
  }, []);
  return (
    <div>
      {spinner ? (
        <LoadingApp />
      ) : (
        <div className="site-wrap">
          <Router>
            <Header />
            <ThemeDark />
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route path="/about" component={() => <About />} />
              <Route path="/job-listing" component={() => <JobListPage />} />
              <Route path="/post-a-job" component={() => <PostJobForm />} />
              <Route
                path="/job-detail/:id"
                component={() => <DescriptionJob />}
              />
              <Route path="/job-applied/:id" component={() => <ApplyList />} />
              <Route
                path="/job-detail-posted/:id"
                component={() => <DescriptionJobPosted />}
              />
              <Route path="/login" component={() => <LoginForm />} />
              <Route path="/register" component={() => <Register />} />
              <Route path="/register-user" component={() => <RegisterUser />} />
              <Route path="/profile" component={() => <Profile />} />
              <Route path="/job-posted" component={() => <PostedJob />} />
              <Route path="/job-applied" component={() => <JobApplied />} />

              <Route component={() => <NotFound />} />
            </Switch>
            <Footer />
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
