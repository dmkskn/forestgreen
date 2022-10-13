import "./Hero.css"
import useSelector from "../../hooks/useAppSelector";
import ColorSquare from "../Color/ColorSquare";
import Color from "../../interfaces/Color";
import { selectIsCopying } from "../../slices/appSlice";
import { useEnvironment } from "../../context/Environment";


type HeroProps = {
	item: Color
}

/**
 * Single color representation with description.
 * Used in the header to display the current selection.
 */
export default function Hero({ item }: HeroProps) {
	const context = useEnvironment()
	const isCopying = useSelector(selectIsCopying)

	return (
		<span className="hero" aria-label="Hero color">
			<span className="hero__description">
				<span className="hero__name">{isCopying ? "Copied" : item.name}</span>
				<span className="hero__value">{item.value}</span>
			</span>
			<span className="hero__color">
				<ColorSquare
					color={item}
					showsLabel={false}
					isCopyable={context.pointer === "coarse"}
				/>
			</span>
		</span>
	)
}