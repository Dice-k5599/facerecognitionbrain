import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn)
    {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className='mr4 f3 link dim white underline pa3 pointer'>Sign Out</p>
        </nav>
        )
    }
    else
    {
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('register')} className='mr2 f3 link dim white underline pa3 pointer'>Register</p>
                    <p onClick={() => onRouteChange('signin')} className='mr4 f3 link dim white underline pa3 pointer'>Sign In</p>
                </nav>
            </div>
        )
    }
}

export default Navigation;