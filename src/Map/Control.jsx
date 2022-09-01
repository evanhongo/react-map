import { useState, memo, ReactElement, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { DomEvent } from 'leaflet'

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const Control = memo(
  ({ position, children, style, prepend }) => {
    const [portalRoot, setPortalRoot] = useState(
      document.createElement('div')
    )
    const controlContainerRef = useRef(null)

    useEffect(() => {
      const positionClass =
        POSITION_CLASSES[position] || POSITION_CLASSES.topright

      const targetDiv = document.getElementsByClassName(positionClass)

      setPortalRoot(targetDiv[0])
    }, [position])

    useEffect(() => {
      if (portalRoot && controlContainerRef.current) {
        if (prepend) {
          portalRoot.prepend(controlContainerRef.current)
        } else {
          portalRoot.append(controlContainerRef.current)
        }

        DomEvent.disableClickPropagation(portalRoot)
      }
    }, [prepend, portalRoot])

    const controlContainer = (
      <div
        ref={controlContainerRef}
        className="leaflet-control leaflet-bar"
        style={style}
      >
        {children}
      </div>
    )

    return createPortal(controlContainer, portalRoot)
  }
)

export default Control;