import "./ColorSquare.css"
import useDispatch from "../../hooks/useAppDispatch";
import copy from "../../utils/copy";
import { addToHistory, startCopyState, endCopyState, updateColor, resetColor } from "../../slices/appSlice";
import Color from "../../interfaces/Color"
import { useState } from "react";
import { useEnvironment } from "../../context/Environment";


function isLight(color: string) {
	const hex = color.substring(1);
	const rgb = parseInt(hex, 16);
	const r = (rgb >> 16) & 0xff;
	const g = (rgb >> 8) & 0xff;
	const b = (rgb >> 0) & 0xff;
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return luma > 100
}


type ColorProps = {
	color: Color,
	showsLabel: boolean,
	isCopyable: boolean
}


/**
 * Represents a color block. This is a button.
 */
export default function ColorSquare({ color, showsLabel, isCopyable }: ColorProps) {
	const context = useEnvironment()
	const dispatch = useDispatch()

	const [isActive, setIsActive] = useState(false);

	function handleClick() {
		dispatch(addToHistory(color))

		if (isCopyable) {
			dispatch(startCopyState())
			copy(color.value)
				.then(() => setTimeout(() => dispatch(endCopyState()), 500))
				.catch((error) => console.log(error))
		}

		dispatch(updateColor(color))
	}

	function handleMouseEnter() {
		if (context.pointer === "fine") {
			dispatch(updateColor(color))
		}
	}

	function handleMouseLeave() {
		if (context.pointer === "fine") {
			dispatch(resetColor())
		}
	}

	function handleTouchStart() {
		setIsActive(true)
	}

	function handleTouchEnd() {
		setIsActive(false)
	}

	function handleMouseDown() {
		setIsActive(true)
	}

	function handleMouseUp() {
		setIsActive(false)
	}

	const style = {
		["--background-color" as string]: color.value,
		["--focus-ring-color" as string]: isLight(color.value) ? "black" : "white",
		["--text-color" as string]: isLight(color.value) ? (context.contrast === "more" ? "black" : "rgb(10, 10, 10)") : (context.contrast === "more" ? "white" : "rgb(215, 215, 215)")
	}

	const classNames = {
		color: [
			"color",
			showsLabel ? "color--with-label" : null,
			isActive ? ["color--active"] : null
		].join(" ").trim(),
		colorLabel: "color__label"
	}

	return (
		<button
			className={classNames.color}
			aria-label={color.name}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onClickCapture={handleClick}
		>
			<span className={classNames.colorLabel}>
				{color.name}
			</span>
		</button>
	)
}