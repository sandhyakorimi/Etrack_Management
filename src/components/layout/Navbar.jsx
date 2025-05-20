




import React from 'react';
import {
  Laptop2,
  LogOut,
  Menu,
  User,
  X,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Settings,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 left-0 right-0 z-10 transition-all duration-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 mr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="flex items-center">
            <Laptop2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white hidden md:inline-block">
              Etrack
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-20 animate-fade-in">
                  <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>

                  <button
                    className={cn(
                      'flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                      'hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowProfile(true);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </button>

                  <button
                    className={cn(
                      'flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                      'hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<User className="h-4 w-4" />}
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      {/* {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-30">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
                onClick={() => setShowProfile(false)}
                aria-label="Close profile"
              >
                ✕
              </button>
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-3xl">
                  {user.name.charAt(0)}
                </div>
              </div>

           Inside your existing profile card code, update these lines
<div className="w-full max-w-md mx-auto flex flex-col items-center space-y-5 text-gray-700 dark:text-gray-300 text-lg">
  <div className="flex w-70 justify-between">
    <span className="font-semibold w-32 text-left">Email</span><strong className='w-5'>: </strong>
    <span className="w-40 text-left">{user.email || 'sandhya@3344'}</span>
  </div>

  <div className="flex w-70 justify-between">
    <span className="font-semibold w-32 text-left">Username</span><strong className='w-5'> : </strong>
    <span className="w-40 text-left">{user.username || ' sandhya_k'}</span>
  </div>

  <div className="flex w-70 justify-between">
    <span className="font-semibold w-32 text-left">Phone</span><strong className='w-5'> : </strong>
    <span className="w-40 text-left">{user.phone || ' +91 9876543210'}</span>
  </div>

  <div className="flex w-70 justify-between">
    <span className="font-semibold w-32 text-left">Role</span><strong className='w-5'> : </strong>
    <span className="w-40 text-left">{user.role || ' Admin'}</span>
  </div>

  <div className="flex w-70 justify-between">
    <span className="font-semibold w-32 text-left">Location</span><strong className='w-5'> : </strong>
    <span className="w-40 text-left">{user.location || ' Andhra Pradesh, India'}</span>
  </div>
</div>
              <button
                className="mt-4 text-sm px-4 py-2 rounded-md bg-gray-200 dark:bg-primary-500 hover:bg-gray-300 dark:hover:bg-primary-700"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div> */}

        
      {/* )} */}
{showProfile && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="relative w-full max-w-md rounded-2xl p-6 
      shadow-lg shadow-black/10 dark:shadow-white/10 
      bg-white/20 dark:bg-white/10 
      backdrop-blur-md 
      border border-white/30 dark:border-white/20 
      ring-1 ring-white/20 dark:ring-white/10 
  
      text-gray-800 dark:text-gray-100
      transition-colors duration-300">

      {/* Close Button */}
      <button
        onClick={() => setShowProfile(false)}
        className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Profile Initial */}
      <div className="flex flex-col items-center space-y-3 mb-5">
        <div
          className="h-24 w-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl shadow-xl ring-4 ring-white/40 dark:ring-gray-500/30"
          style={{ filter: 'brightness(110%)' }}
        >
          {user.name?.charAt(0) || 'S'}
        </div>
        <h2 className="text-xl font-bold">{user.name || "Sandhya Korimi"}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{user.role || "Admin"}</p>
      </div>

      {/* Profile Details */}
      <div className="w-full flex flex-col items-center space-y-5 text-sm">
        <div className="flex w-72 justify-between">
          <span className="font-semibold w-32 text-left">Email</span><strong className="w-5">:</strong>
          <span className="w-40 text-left">{user.email || 'sandhya@3344'}</span>
        </div>
        <div className="flex w-72 justify-between">
          <span className="font-semibold w-32 text-left">Username</span><strong className="w-5">:</strong>
          <span className="w-40 text-left">{user.username || 'sandhya_k'}</span>
        </div>
        <div className="flex w-72 justify-between">
          <span className="font-semibold w-32 text-left">Phone</span><strong className="w-5">:</strong>
          <span className="w-40 text-left">{user.phone || '+91 9876543210'}</span>
        </div>
        <div className="flex w-72 justify-between">
          <span className="font-semibold w-32 text-left">Role</span><strong className="w-5">:</strong>
          <span className="w-40 text-left">{user.role || 'Admin'}</span>
        </div>
        <div className="flex w-72 justify-between">
          <span className="font-semibold w-32 text-left">Location</span><strong className="w-5">:</strong>
          <span className="w-40 text-left">{user.location || 'Andhra Pradesh, India'}</span>
        </div>
      </div>

      {/* Social Icons */}
     <div className="mt-6 flex justify-center space-x-6">
  <a href="#" className="text-blue-600 hover:scale-110 transition-transform">
    <i className="fab fa-linkedin-in text-3xl"></i>
  </a>
  <a href="#" className="text-gray-800 dark:text-white hover:scale-110 transition-transform">
    <i className="fab fa-github text-3xl"></i>
  </a>
  <a href="#" className="text-sky-500 hover:scale-110 transition-transform">
    <i className="fab fa-twitter text-3xl"></i>
  </a>
</div>

      {/* Close Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowProfile(false)}
          className="px-5 py-2 rounded-md bg-primary-500 hover:bg-white/50 text-black dark:text-white font-medium backdrop-blur-sm transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}




      
    </nav>
  );
};







