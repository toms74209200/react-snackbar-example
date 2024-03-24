import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface SnackbarHandles {
  /**
   * Show snackbar
   */
  show: (message: string, duration: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const snackbarRef = useRef<SnackbarHandles>(null);
  const showSnackbar = useCallback((message: string, duration: number) => {
    snackbarRef.current && snackbarRef.current.show(message, duration);
  }, []);
  return {
    snackbarRef,
    showSnackbar,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const Snackbar = forwardRef<SnackbarHandles, {}>((_, ref) => {
  const [poping, setPoping] = useState(false); // Poping is a state to control the opacity of snackbar
  const [isDisplayed, setIsDisplayed] = useState(false); // isDisplayed is a state to control the display of snackbar
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      show: (message, duration) => {
        setPoping(true);
        setMessage(message);
        setDuration(duration);
      },
    }),
    []
  );

  // Hide snackbar after duration that is set by showSnackbar
  useEffect(() => {
    if (poping) {
      const timeout = setTimeout(() => setPoping(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [poping, duration]);

  // Control display of snackbar
  useEffect(() => {
    if (poping) {
      setIsDisplayed(true);
    } else {
      const timeout = () => setTimeout(() => setIsDisplayed(false), 300);
      return () => clearTimeout(timeout());
    }
  }, [poping]);

  return (
    <div
      className={
        `${isDisplayed ? "block" : "hidden"} ` +
        `${poping ? "opacity-100" : "opacity-0 transition-opacity delay-150 duration-300 ease-in-out"} ` +
        "bg-black text-center shadow"
      }
    >
      <p className="p-2 text-white ">{message}</p>
    </div>
  );
});

Snackbar.displayName = "Snackbar";
