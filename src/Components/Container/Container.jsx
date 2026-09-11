//saari properties accept krta h as children
//isko as it is display kra dete h 
//mainly isme styling define krte h 

function Container({children}) {
    

    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;

    //agr sirf ek hi item h return krne ko toh bina paranthesis k bhi likh skte h    
}


export default Container 