import { useCallback, useState } from "react";
import { Snackbar, useSnackbar } from "./Snackbar";

function App() {
  const [duration, setDuration] = useState(1000);
  const { snackbarRef, showSnackbar } = useSnackbar();

  const onClick = useCallback(() => {
    showSnackbar("Hello, world!", duration);
    setDuration(duration + 1000);
  }, [showSnackbar, duration]);

  return (
    <div className="max-w-md flex flex-col justify-start">
      <h1 className="text-xl bold m-2">React Snackbar Example</h1>
      <button className="border p-2 w-max m-2" onClick={onClick}>
        show Snackbar
      </button>
      <div className="fix bottom-3/4 m-4 max-w-md flex justify-center">
        <Snackbar ref={snackbarRef} />
      </div>
    </div>
  );
}

export default App;
