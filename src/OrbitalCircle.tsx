import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'
interface OrbitalProps {
    w : number, 
    h : number,
    scale : number, 
    onClick : Function, 
    n : number 
}

const OrbitalCircle = (props : OrbitalProps) => {
    const {circleFixedStyle, circleOrbitStyle, parentStyle} = useStyle(props.scale, props.w, props.h)
    const circles  = []
    for (let i = 0; i < props.n; i++) {
        circles.push((<div key = {`oc_${i}`} style = {circleOrbitStyle(i, props.n)}></div>))
    }
    return <React.Fragment>
        <div style = {parentStyle()}>
            {circles}
            <div style = {circleFixedStyle()} onClick = {() => props.onClick()}></div>            
        </div>
    </React.Fragment>
}

export default withContext(OrbitalCircle) 