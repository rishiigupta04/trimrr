import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Home,
  HomeIcon,
  LinkIcon,
  LogOut,
  LucideHome,
  User2Icon,
} from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser } = UrlState();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await fnLogout();
      fetchUser();
      navigate("/auth");
      toast.success("Logged out successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        icon: <LogOut className="text-red-500" />,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        theme: "dark",
      });
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 ">
        <Link to="/">
          <img src="/logo.png" alt="trimmr logo" className="h-12 sm:h-20" />
        </Link>

        <div>
          {!user ? (
            location.pathname !== "/auth" && (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            )
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden outline-none">
                <Avatar className="">
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback className="bg-muted bg-slate-900 border">
                    <User2Icon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel className="font-bold text-center">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleMenuItemClick("/")}
                >
                  <LucideHome className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleMenuItemClick("/dashboard")}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && (
        <CircleLoader width={"100%"} color="#0F172A" className="w-full " />
      )}
    </>
  );
};

export default Header;
