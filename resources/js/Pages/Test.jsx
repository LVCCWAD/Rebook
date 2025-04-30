import React from "react";
import { Link } from "@inertiajs/react";
import { useEffect } from 'react';

export default function test(){
    useEffect(() => {console.log("Rendering: Test.jsx");}, []);

    const welcome = "/"
    const login = "/login"
    const register = "/register"
    return(
        <>
            Test.jsx
            <div className="text-green-400">react test</div>
            {/* {props, welcome} */}

            <label htmlFor="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
            <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>

            {/* hardcoded link must be dynamic */}
            <div><Link href={welcome}>welcome test</Link></div>
            <div><Link href={login}>login test</Link></div>
            <div><Link href={register}>register test</Link></div>
        </>
    )
}
