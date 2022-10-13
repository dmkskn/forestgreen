import "./Board.css"
import data from "../../data.json"
import useSelector from "../../hooks/useAppSelector";
import { selectColumns } from "../../slices/appSlice";
import ColorSquare from "../Color/ColorSquare"
import { useEffect, useState } from "react";
import { useEnvironment } from "../../context/Environment";


export default function Board() {
	const context = useEnvironment()
	const columns = useSelector(selectColumns)
	const [colors, setColors] = useState(data)

	useEffect(() => {
		// shuffle colors on first render
		setColors(colors.sort(() => Math.random() - 0.5))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const items = colors.map(color => {
		return (
			<span className="board__item" key={color.name} >
				<ColorSquare
					color={color}
					showsLabel={columns > 1 && columns < 8}
					isCopyable={context.pointer === "fine"}
				/>
			</span>
		)
	})

	const style = {
		["--columns" as string]: columns
	}

	return (
		<main className="board" style={style}>
			{items}
		</main>
	)
}