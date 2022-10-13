import "./Header.css";
import ColumnsRange from "../ColumnsRange/ColumnsRange"
import History from "../History/History"
import Hero from "../Hero/Hero";
import { selectColor, selectHistory } from "../../slices/appSlice";
import useSelector from "../../hooks/useAppSelector";


/**
 * Contains all controls and statuses for the app.
 */
export default function Headers() {
	const color = useSelector(selectColor);
	const history = useSelector(selectHistory)

	return (
		<header className="header">
			<div className="header__item header__item--columns-range">
				<ColumnsRange />
			</div>

			{
				history.length > 0 && <div className=" header__item header__item--history">
					<History items={history} />
				</div>
			}

			{
				color && <div className="header__item header__item--hero">
					<Hero item={color} />
				</div>
			}
		</header>
	)
};