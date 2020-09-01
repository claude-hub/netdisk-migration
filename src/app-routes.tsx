// Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Constants
import { USERS_DASHBOARD_PAGE_URL, USER_SETTINGS_PAGE_URL } from 'constants/routing-urls.constants';

// Features
import { UsersDashboardPage, UsersSettingsPage } from 'features/users-dashboard';

/**
 * App routes component. It initializes the application routes.
 */
const AppRoutes = () => (
  <Router>
    <Switch>
      <Route exact path={USERS_DASHBOARD_PAGE_URL} component={UsersDashboardPage} />

      <Route exact path={USER_SETTINGS_PAGE_URL} component={UsersSettingsPage} />
    </Switch>
  </Router>
);

export default AppRoutes;
