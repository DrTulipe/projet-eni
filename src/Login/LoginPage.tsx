import React, { useState, useRef } from 'react';
import { InputForwarded } from '../Framework/Input/Input';

export let isLogged: boolean = true;

// export function LoginPage() {
//     return <div >

//     </div>;
// }


export function LoginPage() {
    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!emailRef.current || !passwordRef.current) {
            console.error("Les références ne sont pas encore prêtes.");
            return;
        }

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        // Gérez la soumission ici (par exemple, connectez-vous à une API)
        console.log(emailValue, passwordValue);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">E-mail</label>
                        <InputForwarded
                            // className="w-full p-2 border rounded-md"
                            type="email"
                            name="email"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Mot de passe</label>
                        <InputForwarded
                            //   className="w-full p-2 border rounded-md"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn btn-primary">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

