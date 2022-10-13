import useDispatch from "../../hooks/useAppDispatch";
import useSelector from "../../hooks/useAppSelector";
import { updateNumberOfColumns, selectColumns } from "../../slices/appSlice";
import { Slider } from "@mui/material";
import { useEnvironment } from "../../context/Environment";


// TODO: make a decent slider yourself.
// I don't like what's happening here right now.

export default function ColumnsRange() {
	const context = useEnvironment()
    const dispatch = useDispatch()
    const value = useSelector(selectColumns)

    function handleChange(event: Event, newValue: number | number[]) {
        if (typeof newValue === "number") {
            dispatch(updateNumberOfColumns(newValue))
        }
        
    }

    function valueText(value: number) {
        return `${value} ${value === 1 ? "column" : "columns"}`;
      }

    const isCoarse = context.pointer === "coarse"


    const trackColorFill = context.colorScheme === "dark" ? (context.contrast === "more" ? "whitesmoke" : "gainsboro") : (context.contrast === "more" ? "black" : "gray")
    
    return (
        <Slider 
                min={1}
                max={10}
                step={1}
                value={value}
                defaultValue={5}
                aria-label="Number of Columns"
                getAriaValueText={valueText}
                onChange={handleChange}
                sx={{
                    padding: "5px 0",
                    pointerEvents: "all",
                    color: trackColorFill,
                    width: "100%",
                    height: isCoarse ? 6 : 5,
                    "& .MuiSlider-track": {
                        border: "none"
                        
                    },
                    "& .MuiSlider-thumb": {
                        width: isCoarse ? 25 : 15,
                        height: isCoarse ? 25 : 15,
                        borderRadius: "50%",
                        border: context.contrast === "more" ? "1px solid black" : "none",
                        color: "white",
                        "&:before": {
                            boxShadow: context.colorScheme === "dark" ? "0 2px 8px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.3)",
                          },
                        "&:hover, &.Mui-active, &.Mui-focusVisible": {
                            boxShadow: "none",
                            outline: "none",
                            outlineOffset: "none"
                        }
                    },
                  }}
            />
    )
};