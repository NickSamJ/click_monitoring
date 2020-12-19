export interface IClick{
    domain: string,
    date: Date
}


export interface INavigationLink {
    title: string,
    path: string,
    component: React.FC,
    exact: boolean

}
