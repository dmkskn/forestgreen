import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as EnvironmentProvider } from "./context/Environment";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<StrictMode>
		<ReduxProvider store={store}>
			<EnvironmentProvider>
				<App />
			</EnvironmentProvider>
		</ReduxProvider>
	</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();