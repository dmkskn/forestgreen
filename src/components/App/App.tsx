import "./App.css";
import Header from "../Header/Header"
import Board from "../Board/Board"


function App() {
	return (
		<div className="app">
			<div className="app__header">
				<Header />
			</div>
			<div className="app__board" >
				<Board />
			</div>
		</div>
	);
}


export default App;