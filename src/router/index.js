import React from "react";
import { HashRouter as Router, Route  } from "react-router-dom";
import msgRenderPanel from "../views/msgRenderPanel"

const routerMap = [{
    path: '/',     
    name: 'home', 
    exact: true,
    component: msgRenderPanel,
}]

export default function AppRouter(){
    return (
        <Router>
            {
                routerMap.map((route, index) => <Route key={route + index} {...route} />)
            }
        </Router>
    )
}