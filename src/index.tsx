import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import { Issue } from './components/issue/issue';
import { Issues } from './components/issues/issues';
import './styles.scss';

const mountNode = document.getElementById('app');
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/">
        <Route path="/issues" children={<Issues />} />
        <Route path="/issue/:issueSlug/:issuePage" children={<Issue />} />
        <Route exact path="/" render={() => <Redirect to="/issues" />} />
        <Route exact path="/issue/:issueSlug/" render={(history) => <Redirect to={`/issue/${history.match.params.issueSlug}/page-1`} />} />
      </Route>
    </Router>
  </React.StrictMode>, mountNode
);

/*
<Route path="/" component={Game}>
  <Route path="play-vs-ai" component={Calendar} />
  <Route path="ai-vs-ai" component={Calendar} />
  <Route path="match/:player/vs/:opponent" components={{ calendar: Calendar }} />
</Route>
*/
