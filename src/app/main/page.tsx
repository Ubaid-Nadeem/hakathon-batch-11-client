"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Main() {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const [user, setUser] = useState<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [upadatedStatus, setUpadatedStatus] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [adminSelected, setAdminSelected] = useState("Beneficiary Reports");
  const [allBeneficiary, setAllBeneficiary] = useState([]);

  const popUpRef = useRef(null);
  const URI = process.env.NEXT_PUBLIC_SERVER_URI;
  // const URI = "http://localhost:3001";

  useEffect(() => {
    let localUser = localStorage.getItem("taskUser");

    if (localUser) {
      setIsLoading(false);

      localUser = JSON.parse(localUser);
      setUser(localUser);

      if (localUser?.role === "Admin") {
        getAllusers();
      }
    } else {
      route.push("/login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("taskUser");
    setUser(null);
    route.push("/login");
  }

  async function getAllusers() {
    try {
      let data = await axios.get(`${URI}/getbeneficiary`);
      setAllBeneficiary(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {isLoading ? (
        <>
          <div className="text-center flex w-full h-screen justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <div>
          {user && (
            <>
              <div className="bg-[black] text-white flex justify-between items-center p-3">
                <h2>{user.role}</h2>
                <Button
                  className="text-[black] bg-[white]"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
              {user.role === "Receptionist" && (
                <div className="w-full md:w-[350px] m-auto flex flex-col gap-5 pt-10  pb-10">
                  <h1 className="text-center font-bold text-[24px]">
                    Beneficiary Details
                  </h1>
                  <Input
                    placeholder="CNIC"
                    type="number"
                    value={cnic}
                    onChange={(e) => {
                      setCnic(e.target.value);
                    }}
                  />

                  <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Contact"
                    type="number"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Adress"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <Select
                    onValueChange={(e) => {
                      setCity(e);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Karachi">Karachi</SelectItem>
                      <SelectItem value="Lahore">Lahore</SelectItem>
                      <SelectItem value="Islamabad">Islamabad</SelectItem>
                      <SelectItem value="Peshawar">Peshawar</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(e) => {
                      setProvince(e);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sindh">Sindh</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="KPK">KPK</SelectItem>
                      <SelectItem value="Balochistan">Balochistan</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(e) => {
                      setPurpose(e);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rashan">Rashan</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Loan">Loan</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    disabled={isPending}
                    onClick={async () => {
                      setIsPending(true);

                      let data = {
                        cnic,
                        address,
                        contact,
                        purpose,
                        name,
                        email,
                        city,
                        province,
                      };
                      if (
                        cnic &&
                        address &&
                        contact &&
                        purpose &&
                        name &&
                        email &&
                        city &&
                        province
                      ) {
                        try {
                          let res = await axios.post(`${URI}/newcustomer`, {
                            cnic,
                            address,
                            contact,
                            purpose,
                            name,
                            email,
                          });

                          setAddress("");
                          setCnic("");
                          setContact("");
                          setName("");
                          setEmail("");
                          setPurpose("");
                          let date = new Date();

                          toast("Token sent on email", {
                            description: `${date}`,
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          });
                          setIsPending(false);
                        } catch (e) {
                          console.log(e);
                          setIsPending(false);
                        }
                      } else {
                        setIsPending(false);
                        alert("Fill all feilds");
                      }
                    }}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Please wait{" "}
                      </>
                    ) : (
                      "Generate Token"
                    )}
                  </Button>
                </div>
              )}

              {user.role === "Department Staff" && (
                <div className="p-5">
                  <div className="m-auto w-full md:w-[350px] flex flex-col gap-5 pt-10">
                    <Input
                      placeholder="Token Number"
                      type="number"
                      value={token}
                      onChange={(e) => {
                        setToken(e.target.value);
                      }}
                    />
                    <Select
                      onValueChange={(e) => {
                        setPurpose(e);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rashan">Rashan</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                        <SelectItem value="Loan">Loan</SelectItem>
                      </SelectContent>
                    </Select>

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
                      onClick={async () => {
                        if (token && purpose) {
                          let res = await axios.post(`${URI}}/finduser`, {
                            token,
                            purpose,
                          });
                          setUsers(res.data);
                          setPurpose("");
                          setToken("");
                        } else {
                          setIsError(true);
                          setErrorMessage("Enter a valid data");

                          setTimeout(() => {
                            setIsError(false);
                            setErrorMessage("");
                          }, 4000);
                        }
                      }}
                    >
                      Search
                    </Button>
                  </div>

                  <div className="p-5">
                    <input
                      type="checkbox"
                      id="my_modal_6"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Assistance Status</h3>
                        <p className="py-4">
                          <select
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => {
                              setUpadatedStatus(e.target.value);
                              console.log(users[0].AssistanceStatus);
                              if (
                                users[0].AssistanceStatus === e.target.value
                              ) {
                                setIsUpdated(true);
                              } else {
                                setIsUpdated(false);
                              }
                            }}
                          >
                            <option disabled selected>
                              Status
                            </option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                          </select>
                        </p>
                        <div className="modal-action">
                          <label
                            htmlFor="my_modal_6"
                            className="btn"
                            ref={popUpRef}
                          >
                            Cancel
                          </label>

                          <button
                            disabled={isUpdated}
                            className="btn btn-primary"
                            onClick={async () => {
                              console.log(users[0]._id, upadatedStatus);
                              try {
                                let res = await axios.post(`${URI}/update`, {
                                  userid: users[0]._id,
                                  AssistanceStatus: upadatedStatus,
                                });

                                if (res) {
                                  let userClone = [...users];
                                  userClone[0].AssistanceStatus =
                                    upadatedStatus;
                                  setUsers([...userClone]);
                                  popUpRef.current?.click();
                                }
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>

                    {users[0] ? (
                      users.map((user, id) => {
                        return (
                          <Card key={id} className="w-full md:w-[350px]">
                            <CardHeader>
                              <CardTitle>{user?.name}</CardTitle>
                              <CardDescription>{user.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-[14px]">CNIC : {user.cnic}</p>
                              <p className="text-[14px]">
                                Purpose : {user.purpose}
                              </p>
                              <p className="text-[14px]">
                                Token : {user.token}
                              </p>
                              <p className="text-[14px]">
                                Assistance Status : {user.AssistanceStatus}
                              </p>
                            </CardContent>
                            <CardFooter>
                              <label
                                htmlFor="my_modal_6"
                                className="btn bg-[black] text-white"
                              >
                                Edit
                              </label>
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-center w-full text-[14px] p-5">
                        No Beneficiary available
                      </p>
                    )}
                  </div>
                </div>
              )}

              {user.role === "Admin" && (
                <div className="flex">
                  <div className="bg-gray-300 h-screen w-[250px] ">
                    <ul>
                      <li
                        className="p-5 border-b cursor-pointer hover:bg-[#dfe4ea]"
                        onClick={() => {
                          setAdminSelected("Beneficiary Reports");
                        }}
                      >
                        Beneficiary Reports
                      </li>
                      <li
                        className="p-5 border-b cursor-pointer hover:bg-[#dfe4ea]"
                        onClick={() => {
                          setAdminSelected("Analysis");
                        }}
                      >
                        Analysis
                      </li>
                    </ul>
                  </div>
                  <div className=" h-screen w-full p-5 ">
                    {adminSelected === "Beneficiary Reports" && (
                      <div>
                        <h2 className="font-bold py-5">Beneficiary Users</h2>
                        <Table>
                          <TableCaption>
                            A list of your recent invoices.
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Name</TableHead>
                              <TableHead>purpose</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead className="text-right">
                                Status
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {allBeneficiary.map((user,id) => {
                              return (
                                <TableRow key={id}>
                                  <TableCell className="">
                                    {user?.name}
                                  </TableCell>
                                  <TableCell>{user.purpose}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell className="text-right">
                                    {user?.AssistanceStatus}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    {adminSelected === "Analysis" && <div>world</div>}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
