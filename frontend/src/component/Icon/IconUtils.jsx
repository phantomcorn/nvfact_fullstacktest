export default function getSvgIcon(variant, strokeColor) {
    switch (variant) {
        case "home":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9823 2.76376C12.631 2.4905 12.4553 2.35388 12.2613 2.30136C12.0902 2.25502 11.9098 2.25502 11.7387 2.30136C11.5447 2.35388 11.369 2.4905 11.0177 2.76375L4.23539 8.03888C3.78202 8.3915 3.55534 8.56781 3.39203 8.78861C3.24737 8.9842 3.1396 9.20454 3.07403 9.43881C3 9.70327 3 9.99045 3 10.5648V17.7997C3 18.9198 3 19.4799 3.21799 19.9077C3.40973 20.284 3.71569 20.59 4.09202 20.7818C4.51984 20.9997 5.0799 20.9997 6.2 20.9997H8.2C8.48003 20.9997 8.62004 20.9997 8.727 20.9452C8.82108 20.8973 8.89757 20.8208 8.9455 20.7267C9 20.6198 9 20.4798 9 20.1997V13.5997C9 13.0397 9 12.7597 9.10899 12.5457C9.20487 12.3576 9.35785 12.2046 9.54601 12.1087C9.75992 11.9997 10.0399 11.9997 10.6 11.9997H13.4C13.9601 11.9997 14.2401 11.9997 14.454 12.1087C14.6422 12.2046 14.7951 12.3576 14.891 12.5457C15 12.7597 15 13.0397 15 13.5997V20.1997C15 20.4798 15 20.6198 15.0545 20.7267C15.1024 20.8208 15.1789 20.8973 15.273 20.9452C15.38 20.9997 15.52 20.9997 15.8 20.9997H17.8C18.9201 20.9997 19.4802 20.9997 19.908 20.7818C20.2843 20.59 20.5903 20.284 20.782 19.9077C21 19.4799 21 18.9198 21 17.7997V10.5648C21 9.99045 21 9.70327 20.926 9.43881C20.8604 9.20454 20.7526 8.9842 20.608 8.78861C20.4447 8.56781 20.218 8.3915 19.7646 8.03888L12.9823 2.76376Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        case "right-arrow":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "chevron-down":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "alert-triangle":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.9998 9.00023V13.0002M11.9998 17.0002H12.0098M10.6151 3.89195L2.39019 18.0986C1.93398 18.8866 1.70588 19.2806 1.73959 19.6039C1.769 19.886 1.91677 20.1423 2.14613 20.309C2.40908 20.5002 2.86435 20.5002 3.77487 20.5002H20.2246C21.1352 20.5002 21.5904 20.5002 21.8534 20.309C22.0827 20.1423 22.2305 19.886 22.2599 19.6039C22.2936 19.2806 22.0655 18.8866 21.6093 18.0986L13.3844 3.89195C12.9299 3.10679 12.7026 2.71421 12.4061 2.58235C12.1474 2.46734 11.8521 2.46734 11.5935 2.58235C11.2969 2.71421 11.0696 3.10679 10.6151 3.89195Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "arrow-left":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case  "arrow-right":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case  "arrow-up":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        
        case "check":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "logout":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );


        case "minus":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "plus":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "refresh":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "search":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "bin":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "user":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "x":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "eye":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )

        case "eye-off":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            )

        case "edit": 
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.87601 18.1159C2.92195 17.7024 2.94493 17.4957 3.00748 17.3025C3.06298 17.131 3.1414 16.9679 3.24061 16.8174C3.35242 16.6478 3.49952 16.5008 3.7937 16.2066L17 3.0003C18.1046 1.89573 19.8954 1.89573 21 3.0003C22.1046 4.10487 22.1046 5.89573 21 7.0003L7.7937 20.2066C7.49951 20.5008 7.35242 20.6479 7.18286 20.7597C7.03242 20.8589 6.86926 20.9373 6.69782 20.9928C6.50457 21.0553 6.29783 21.0783 5.88434 21.1243L2.49997 21.5003L2.87601 18.1159Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )

        default:
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
    }
}

