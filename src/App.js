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
import NotFound from "./components/NotFound";
import HomeChoose from "./components/HomeChoose";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="site-wrap">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <HomeChoose />} />
          <Route path="/home" component={() => <JobList />} />
          <Route path="/about" component={() => <About />} />
          <Route path="/job-listing" component={() => <JobListPage />} />
          <Route path="/post-a-job" component={() => <PostJobForm />} />
          <Route path="/job-detail/:id" component={() => <DescriptionJob />} />
          <Route path="/login" component={() => <LoginForm />} />
          <Route path="/register" component={() => <Register />} />
          <Route path="/profile" component={() => <Profile />} />

          <Route component={() => <NotFound />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
