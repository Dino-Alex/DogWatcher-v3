  import BigNumber from 'bignumber.js'
import { DatePickerPortal } from 'components/DatePicker'
import useCheckTokenExpired from 'hooks/useCheckTokenExpired'
import useEagerConnect from 'hooks/useEagerConnect'
import React, { lazy } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useSaveReferrer } from 'state/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import PageLoader from './components/Loader/PageLoader'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import history from './routerHistory'
import GlobalStyle from './style/Global'
import ResetCSS from './style/ResetCSS'
import { ModalAlert } from "./views/Account/components/ModalAlert"
// import Inventory from './views/Inventory/index'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page

const NotFound = lazy(() => import('./views/NotFound'))
const AdminTable = lazy(() => import('./views/AdminTable'))
const Create = lazy(() => import('./views/AdminTable/components/CRUD/components/Create/index')) 
const Update = lazy(() => import('./views/AdminTable/components/CRUD/components/Update/index')) 
const ProjectTable = lazy(() => import('./views/ProjectTable'))
// const Register = lazy(() => import('./state/register/index'))
// This config is required for number formatting Membership 
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})


const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useSaveReferrer()
  
  useCheckTokenExpired()
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <ModalAlert/>
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <AdminTable />
            </Route>
            {/* <Route path="/admintable">
              <AdminTable />
            </Route> */}
            <Route path="/create">
              <Create />
            </Route>
            {/* <Route path="/projecttable">
              <ProjectTable />
            </Route> */}
            <Route exact path="/update/:idProject" component={Update} />
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
