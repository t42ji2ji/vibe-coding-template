import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CursorVariant = 'default' | 'hover' | 'click'

interface CustomCursorProps {
    color?: string
    invertOnDarkMode?: boolean
    lightColor?: string
}

const CustomCursor = ({
    color = '#000000',
    invertOnDarkMode = true,
    lightColor = '#ffffff'
}: CustomCursorProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [variant, setVariant] = useState<CursorVariant>('default')
    const [isOverDarkBackground, setIsOverDarkBackground] = useState(false)
    const elementDetectionRef = useRef<HTMLDivElement>(null)

    // Function to check if background is dark
    const checkIfBackgroundIsDark = (x: number, y: number) => {
        if (!invertOnDarkMode) return false;

        // Check background color below cursor
        const element = document.elementFromPoint(x, y);
        if (!element) return false;

        const bgColor = getComputedStyle(element).backgroundColor;

        // If background is transparent or not set, try to get parent's background
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            let parent = element.parentElement;
            let parentBgColor = 'rgba(0, 0, 0, 0)';

            // Try to find a parent with a non-transparent background
            while (parent && (parentBgColor === 'rgba(0, 0, 0, 0)' || parentBgColor === 'transparent')) {
                parentBgColor = getComputedStyle(parent).backgroundColor;
                if (parentBgColor !== 'rgba(0, 0, 0, 0)' && parentBgColor !== 'transparent') {
                    // Found a parent with a background
                    return isColorDark(parentBgColor);
                }
                parent = parent.parentElement;
            }

            // If we got here, we couldn't find a non-transparent background
            // Assume it's the body/document background
            return isColorDark(getComputedStyle(document.body).backgroundColor);
        }

        return isColorDark(bgColor);
    };

    // Function to determine if a color is dark
    const isColorDark = (colorStr: string) => {
        // Extract RGB values from the background color
        const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

        if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);

            // Calculate brightness using perceptual luminance formula
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

            // If brightness is less than 128, background is considered dark
            return brightness < 128;
        }

        // Default to false if we can't determine
        return false;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)

            // Check background darkness
            setIsOverDarkBackground(checkIfBackgroundIsDark(e.clientX, e.clientY));
        }

        const handleMouseDown = () => setVariant('click')
        const handleMouseUp = () => setVariant('default')

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        const handleClickableHoverStart = (e: Event) => {
            e.stopPropagation()
            setVariant('hover')
        }

        const handleClickableHoverEnd = (e: Event) => {
            e.stopPropagation()
            setVariant('default')
        }

        // Add hover detection to all clickable elements
        const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea')
        clickables.forEach(element => {
            element.addEventListener('mouseenter', handleClickableHoverStart, { passive: true })
            element.addEventListener('mouseleave', handleClickableHoverEnd, { passive: true })
        })

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseenter', handleMouseEnter)
        window.addEventListener('mouseleave', handleMouseLeave)

        // Hide default cursor
        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseenter', handleMouseEnter)
            window.removeEventListener('mouseleave', handleMouseLeave)

            clickables.forEach(element => {
                element.removeEventListener('mouseenter', handleClickableHoverStart)
                element.removeEventListener('mouseleave', handleClickableHoverEnd)
            })

            // Restore default cursor
            document.body.style.cursor = 'auto'
        }
    }, [isVisible, invertOnDarkMode])

    // Get current cursor color based on background
    const currentColor = invertOnDarkMode && isOverDarkBackground ? lightColor : color;

    // Cursor variants
    const cursorVariants = {
        default: {
            width: 24,
            height: 24,
            backgroundColor: 'transparent',
            border: `2px solid ${currentColor}`,
            x: position.x - 12,
            y: position.y - 12,
            opacity: 0.75,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.5
            }
        },
        hover: {
            width: 36,
            height: 36,
            backgroundColor: `${currentColor}20`, // Color with very low opacity
            border: `2px solid ${currentColor}`,
            x: position.x - 18,
            y: position.y - 18,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.5
            }
        },
        click: {
            width: 16,
            height: 16,
            backgroundColor: `${currentColor}50`, // Color with medium opacity
            border: `2px solid ${currentColor}`,
            x: position.x - 8,
            y: position.y - 8,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.5,
                duration: 0.1
            }
        }
    }

    // Dot cursor (follows exactly)
    const dotVariants = {
        default: {
            width: 4,
            height: 4,
            x: position.x - 2,
            y: position.y - 2,
            backgroundColor: currentColor,
            opacity: 0.75,
            transition: {
                type: 'tween',
                ease: 'backOut',
                duration: 0.05
            }
        },
        hover: {
            width: 8,
            height: 8,
            x: position.x - 4,
            y: position.y - 4,
            backgroundColor: currentColor,
            opacity: 1
        },
        click: {
            width: 10,
            height: 10,
            x: position.x - 5,
            y: position.y - 5,
            backgroundColor: currentColor,
            opacity: 1
        }
    }

    if (!isVisible) return null

    return (
        <div
            className="cursor-container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
            ref={elementDetectionRef}
        >
            <motion.div
                className="cursor-outer"
                style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}
                variants={cursorVariants}
                animate={variant}
                initial="default"
            />
            <motion.div
                className="cursor-dot"
                style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}
                variants={dotVariants}
                animate={variant}
                initial="default"
            />
        </div>
    )
}

export default CustomCursor 