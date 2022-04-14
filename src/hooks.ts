import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.01 
const delay : number = 20

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }

                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w, 
        h
    }
}
const sinify : Function = (scale : number) => Math.sin(scale * Math.PI)

export const useStyle = (scale : number, w : number, h : number) => {
    const sf : number = sinify(scale)
    const r : number = Math.min(w, h) / 15 
    const l : number = Math.min(w, h) / 3 
    const position = 'absolute'
    const borderRadius = '50%'
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            return {
                position, 
                left, 
                top 
            }
        },
        circleOrbitStyle(i : number, n : number) : CSSProperties {
            const deg : number = 2 * Math.PI / n 
            const x : number = l * sf * Math.cos(-deg / 2 + deg * i)
            const y : number = l * sf * Math.sin(-deg / 2 + deg * i)
            const left : string = `${x - r / 2}px`
            const top : string = `${y - r / 2}px`
            const width : string = `${r}px`
            const height : string = `${r}px`
            const background : string = "#00C853"
            return {
                position, 
                left, 
                top, 
                width, 
                height,  
                opacity: sf,
                borderRadius, 
                background 
            }
        }, 

        circleFixedStyle() : CSSProperties  {
            const left = `${-r / 2}px`
            const top = `${-r / 2}px`
            const width = `${r}px`
            const height = `${r}px`
            const background : string = '#304FFE'
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                borderRadius,
                background 
            }
        }
    }
}