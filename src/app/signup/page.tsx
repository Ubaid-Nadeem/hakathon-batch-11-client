"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const route = useRouter();

  const URI = process.env.NEXT_PUBLIC_SERVER_URI;
  // const URI = "http://localhost:3001";

  const getValues = () => {
    setIsLoading(true);
    axios
      .post(`${URI}/auth/signup`, {
        email,
        password,
        name,
        role,
      })
      .then((res) => {
        localStorage.setItem("taskUser", JSON.stringify(res.data.data));
        route.push("/main");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code == "ERR_NETWORK") {
          setIsError(true);
          setErrorMessage(error.message);
        } else {
          console.log(error);
          setIsError(true);
          setErrorMessage(error.response.data.msg);
          setIsLoading(false);
        }
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
          setIsLoading(false);
        }, 4000);
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

        <Select
          onValueChange={(e) => {
            setRole(e);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Department Staff">Department Staff</SelectItem>
            <SelectItem value="Receptionist">Receptionist</SelectItem>
          </SelectContent>
        </Select>

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

        {/* error div */}

        <div
          className="bg-[#fab1a0] p-2 text-[14px]"
          style={{
            border: "1px solid red",
            display: `${isError ? "block" : "none"}`,
          }}
        >
          {errorMessage}
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
