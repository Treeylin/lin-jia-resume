import { useRef } from 'react'
import './TiltedCard.css'

function TiltedCard({
  children,
  className = '',
  captionText = '',
  rotateAmplitude = 10,
  scaleOnHover = 1.04,
  showTooltip = true,
  ...rest
}) {
  const ref = useRef(null)
  const innerRef = useRef(null)
  const captionRef = useRef(null)
  const lastYRef = useRef(0)

  function handleMouse(event) {
    if (!ref.current || !innerRef.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    const rotateX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude

    innerRef.current.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scaleOnHover})`

    if (captionRef.current) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const rotate = -(offsetY - lastYRef.current) * 0.6
      captionRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 42px) rotate(${rotate.toFixed(2)}deg)`
      lastYRef.current = offsetY
    }
  }

  function handleMouseEnter() {
    ref.current?.classList.add('is-hovering')
  }

  function handleMouseLeave() {
    ref.current?.classList.remove('is-hovering')
    lastYRef.current = 0
    if (innerRef.current) innerRef.current.style.transform = ''
    if (captionRef.current) captionRef.current.style.transform = ''
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div
        ref={innerRef}
        className="tilted-card-inner"
      >
        {children}
      </div>
      {showTooltip && captionText && (
        <figcaption
          ref={captionRef}
          className="tilted-card-caption"
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  )
}

export default TiltedCard
