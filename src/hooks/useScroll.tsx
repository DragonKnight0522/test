import { useEffect } from "react";

const useScroll = (callback: () => void) => {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight
                // window.innerHeight + window.scrollY >=
                // document.documentElement.scrollHeight - 500
			)
				return;
			callback();
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
        
	}, [callback]);
};

export default useScroll;
