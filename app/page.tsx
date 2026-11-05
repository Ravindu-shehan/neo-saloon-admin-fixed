"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-hot-toast/headless";
import axios from "axios";
import api from "@/lib/api";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(){
        //const response = await axios.post("http://localhost:3000/api/auth",{
          //email: email,
          //password: password
        //})
        try{
          const response = await api.post("/api/auth",
            {
              email : email,
              password : password
            }
          )

        }catch(error){
          toast.error("Invalid Credentials")
        }
        
        
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md px-6">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>

            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>

            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form id="login-form">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>

                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    required
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" form="login-form" className="w-full"
            onClick={handleLogin}>
              Login
            </Button>

            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}