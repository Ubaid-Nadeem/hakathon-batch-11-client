"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const getValues = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/auth/signup", {
        email,
        password,
        name,
      })
      .then((res) => {
        localStorage.setItem("taskSUer", JSON.stringify(res.data.data));
        route.push("/main");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code == "Network Error") {
          console.log(error.message);
        } else {
          console.log(error);
          // console.log(error.response.data.msg);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="login_container flex w-full h-screen justify-center items-center">
      <div className="login_child_container p-10 w-full md:w-[450px] ">
        <h2 className="text-center font-bold text-2xl mb-10">
          Create a new account
        </h2>
        <Input
          placeholder="Name"
          type="text"
          className="mb-5"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          placeholder="Email"
          type="email"
          className="mb-5"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Password"
          type={showPass ? "text" : "password"}
          className="mb-5"
        />
        <div className="flex items-center space-x-2 my-5">
          <Checkbox
            id="terms"
            onClick={() => {
              setShowPass(!showPass);
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Password
          </label>
        </div>

        <Button
          disabled={isLoading}
          className="w-full my-5"
          onClick={() => {
            getValues();
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait{" "}
            </>
          ) : (
            "Sign up"
          )}
        </Button>

        <p className="text-center py-2">
          Already have an account?{" "}
          <span
            className="hover:text-[blue] cursor-pointer underline"
            onClick={() => {
              route.push("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
