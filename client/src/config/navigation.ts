import { INavigationLink } from "../interfaces"
import Homepage from '../pages/Homepage';
import TableStats from '../pages/TableStats';
import ChartStats from '../pages/ChartStats';

const NavigationLinks:INavigationLink[] = [
    {title: 'Home', path: '/', component: Homepage, exact: true},
    {title: 'Table Statistics', path: '/table', component: TableStats, exact: true },
    {title: 'Chart Statistics', path: '/chart', component:  ChartStats, exact: true }
]
export default NavigationLinks