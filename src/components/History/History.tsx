import "./History.css"
import ColorSquare from "../Color/ColorSquare"
import ColorPlaceholder from "../ColorPlaceholder/ColorPlaceholder";
import { History } from "../../types/History";
import { useEnvironment } from "../../context/Environment";


type HistoryProps = {
	items: History
}

/**
 * A simple row of color squares (last selected)
 */
export default function HistoryRow({ items }: HistoryProps) {
	const context = useEnvironment()

	const colors = items.map(color => {
		return (
			<span key={color.name} className="history__item">
				<ColorSquare
					color={color}
					showsLabel={false}
					isCopyable={context.pointer === "fine"}
				/>
			</span>
		)
	})

	while (colors.length !== 5) {
		colors.push((
			<span className="history__item history__item--placeholder">
				<ColorPlaceholder />
			</span>
		))
	}

	return (
		<span className="history" aria-label="History">
			{colors}
		</span>
	)
}