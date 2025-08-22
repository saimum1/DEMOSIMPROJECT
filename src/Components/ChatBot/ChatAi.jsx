import React,{useEffect}from 'react'

const ChatAi = () => {
    useEffect(() => {
        // Tawk.to script
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/67077e72cec6d0125df4722e/1i9qlaqn4'; // Your Tawk.to script source
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);

        // Optional: Cleanup on component unmount
        return () => {
            // Remove the script on unmount if needed
            const scripts = document.getElementsByTagName("script");
            for (let i = scripts.length - 1; i >= 0; i--) {
                if (scripts[i].src.includes("tawk.to")) {
                    scripts[i].parentNode.removeChild(scripts[i]);
                }
            }
        };
    }, []);

    return null; // This component does not render anything visible
};


export default ChatAi