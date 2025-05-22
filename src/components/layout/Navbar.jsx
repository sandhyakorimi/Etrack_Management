// import React from 'react';
// import {
//   Laptop2,
//   LogOut,
//   Menu,
//   User,
//   X,
//   Mail,
//   Phone,
//   Briefcase,
//   MapPin,
//   Bell,
// } from 'lucide-react';
// import { ThemeToggle } from '../ui/ThemeToggle';
// import { Button } from '../ui/Button';
// import { useAuth } from '../../context/AuthContext';
// import { cn } from '../../utils/cn';

// export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
//   const { user, logout } = useAuth();
//   const [showUserMenu, setShowUserMenu] = React.useState(false);
//   const [showProfile, setShowProfile] = React.useState(false);
//   const [showAlerts, setShowAlerts] = React.useState(false);

//   // Mock alerts data (replace with actual data from API or context)
//   const alerts = [
//     {
//       id: 1,
//       message: 'Monitor in Server Room is not working',
//       date: '2025-05-22T14:00:00Z',
//       type: 'critical',
//     },
//     {
//       id: 2,
//       message: 'WiFi Router in IOT Lab needs maintenance',
//       date: '2025-05-22T13:30:00Z',
//       type: 'warning',
//     },
//     {
//       id: 3,
//       message: 'AC in CEO Cabin is functioning normally',
//       date: '2025-05-22T12:15:00Z',
//       type: 'info',
//     },
//   ];

//   return (
//     <nav
//       className={cn(
//         'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 left-0 right-0 z-[100] transition-all duration-300'
//       )}
//     >
//       <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
//         <div className="flex items-center">
//           <button
//             onClick={() => {
//               console.log('Toggling sidebar, isSidebarOpen:', isSidebarOpen);
//               onToggleSidebar();
//             }}
//             className={cn(
//               'p-1 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-2 hover:border-primary-500 dark:hover:border-primary-400 mr-2 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden'
//             )}
//             aria-label="Toggle sidebar"
//           >
//             {isSidebarOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
//           </button>

//           <div className="flex items-center">
//             <Laptop2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" />
//             <span
//               className={cn(
//                 'ml-1 sm:ml-2 text-lg sm:text-xl font-semibold text-gray-800 dark:text-white',
//                 'hidden sm:inline-block'
//               )}
//             >
//               Etrack
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2 sm:space-x-4">
//           <ThemeToggle />
          
//           {/* Alert Icon */}
//           <button
//             onClick={() => setShowAlerts(true)}
//             className="relative p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
//             aria-label="View alerts"
//           >
//             <Bell className="h-6 w-6" />
//             {alerts.length > 0 && (
//               <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
//                 {alerts.length}
//               </span>
//             )}
//           </button>

//           {user ? (
//             <div className="relative">
//               <button
//                 className="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//               >
//                 <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm sm:text-base">
//                   {user.name.charAt(0)}
//                 </div>
//                 <span className="hidden md:inline-block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {user.name}
//                 </span>
//               </button>

//               {showUserMenu && (
//                 <div
//                   className={cn(
//                     'absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-[120] animate-fade-in'
//                   )}
//                 >
//                   <div className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
//                     <p className="font-medium">{user.name}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
//                   </div>

//                   <button
//                     className={cn(
//                       'flex w-full items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300',
//                       'hover:bg-gray-100 dark:hover:bg-gray-700'
//                     )}
//                     onClick={() => {
//                       setShowUserMenu(false);
//                       setShowProfile(true);
//                     }}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </button>

//                   <button
//                     className={cn(
//                       'flex w-full items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300',
//                       'hover:bg-gray-100 dark:hover:bg-gray-700'
//                     )}
//                     onClick={() => {
//                       logout();
//                       setShowUserMenu(false);
//                     }}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Button
//               variant="primary"
//               size="sm"
//               leftIcon={<User className="h-3 w-3 sm:h-4 sm:w-4" />}
//               className="text-xs sm:text-sm px-2 sm:px-4"
//             >
//               Login
//             </Button>
//           )}
//         </div>
//       </div>

//       {showProfile && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
//           <div
//             className={cn(
//               'relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl sm:rounded-2xl p-4 sm:p-6',
//               'shadow-lg shadow-black/10 dark:shadow-white/10',
//               'bg-white/10 dark:bg-white/10 backdrop-blur-md',
//               'border border-white/20 ring-1 ring-white/20',
//               'text-white transition-colors duration-300'
//             )}
//           >
//             <button
//               onClick={() => setShowProfile(false)}
//               className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white hover:text-gray-200 text-lg sm:text-xl hover:border-2 hover:border-primary-500 dark:hover:border-primary-400 rounded-md p-1"

//       {/* Profile Modal */}
//       {showProfile && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//           <div className="relative w-full max-w-md rounded-2xl p-6 
//             shadow-lg shadow-black/10 dark:shadow-white/10 
//             bg-white/10 dark:bg-white/10 
//             backdrop-blur-md 
//             border border-white/20 
//             ring-1 ring-white/20 
//             text-white 
//             transition-colors duration-300"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setShowProfile(false)}
//               className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <div className="flex flex-col items-center space-y-2 sm:space-y-3 mb-4 sm:mb-5">
//               <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl shadow-xl ring-4 ring-white/40">
//                 {user.name?.charAt(0) || 'S'}
//               </div>
//               <h2 className="text-lg sm:text-xl font-bold">{user.name || 'Sandhya Korimi'}</h2>
//               <p className="text-xs sm:text-sm text-white">{user.role || 'Admin'}</p>
//             </div>

//             <div className="w-full flex flex-col items-center space-y-3 sm:space-y-4 text-xs sm:text-sm">
//               <div className="flex w-64 sm:w-72 items-center">
//                 <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
//                 <span className="font-semibold w-24 sm:w-28">Email</span>
//             {/* Profile Initial */}
//             <div className="flex flex-col items-center space-y-3 mb-5">
//               <div className="h-24 w-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl shadow-xl ring-4 ring-white/40">
//                 {user.name?.charAt(0) || 'S'}
//               </div>
//               <h2 className="text-xl font-bold">{user.name || "Sandhya Korimi"}</h2>
//               <p className="text-sm text-white">{user.role || "Admin"}</p>
//             </div>

//             {/* Profile Details with Icons */}
//             <div className="w-full flex flex-col items-center space-y-4 text-sm">
//               <div className="flex w-72 items-center">
//                 <Mail className="w-4 h-4 mr-2 text-white" />
//                 <span className="font-semibold w-28">Email</span>
//                 <strong className="mx-1">:</strong>
//                 <span className="text-left">{user.email || 'sandhya@3344'}</span>
//               </div>

//               <div className="flex w-64 sm:w-72 items-center">
//                 <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
//                 <span className="font-semibold w-24 sm:w-28">Username</span>
//               <div className="flex w-72 items-center">
//                 <User className="w-4 h-4 mr-2 text-white" />
//                 <span className="font-semibold w-28">Username</span>
//                 <span>{user.username || 'sandhya_k'}</span>
//               </div>

//               <div className="flex w-64 sm:w-72 items-center">
//                 <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
//                 <span className="font-semibold w-24 sm:w-28">Phone</span>
//                 <strong className="mx-1">:</strong>
//                 <span>{user.phone || '+91 9876543210'}</span>
//               </div>

//               <div className="flex w-64 sm:w-72 items-center">
//                 <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
//                 <span className="font-semibold w-24 sm:w-28">Role</span>
//               <div className="flex w-72 items-center">
//                 <Briefcase className="w-4 h-4 mr-2 text-white" />
//                 <span className="font-semibold w-28">Role</span>
//                 <strong className="mx-1">:</strong>
//                 <span>{user.role || 'Admin'}</span>
//               </div>

//               <div className="flex w-64 sm:w-72 items-center">
//                 <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
//                 <span className="font-semibold w-24 sm:w-28">Location</span>
//               <div className="flex w-72 items-center">
//                 <MapPin className="w-4 h-4 mr-2 text-white" />
//                 <span className="font-semibold w-28">Location</span>
//                 <strong className="mx-1">:</strong>
//                 <span>{user.location || 'Andhra Pradesh, India'}</span>
//               </div>
//             </div>

//             <div className="mt-4 sm:mt-6 flex justify-center">
//               <button
//                 onClick={() => setShowProfile(false)}
//                 className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-md bg-primary-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition text-xs sm:text-sm"

//             {/* Close Button */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={() => setShowProfile(false)}
//                 className="px-5 py-2 rounded-md bg-primary-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Alerts Modal */}
//       {showAlerts && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//           <div className="relative w-full max-w-md rounded-2xl p-6 
//             shadow-lg shadow-black/10 dark:shadow-white/10 
//             bg-white/10 dark:bg-white/10 
//             backdrop-blur-md 
//             border border-white/20 
//             ring-1 ring-white/20 
//             text-white 
//             transition-colors duration-300"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setShowAlerts(false)}
//               className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             {/* Modal Header */}
//             <div className="flex items-center justify-center mb-5">
//               <Bell className="h-8 w-8 text-white mr-2" />
//               <h2 className="text-xl font-bold">Alerts</h2>
//             </div>

//             {/* Alerts List */}
//             <div className="max-h-80 overflow-y-auto space-y-4">
//               {alerts.length === 0 ? (
//                 <p className="text-center text-white">No alerts available.</p>
//               ) : (
//                 alerts.map((alert) => (
//                   <div
//                     key={alert.id}
//                     className="flex items-start p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
//                   >
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{alert.message}</p>
//                       <p className="text-xs text-gray-300 mt-1">
//                         {new Date(alert.date).toLocaleString('en-IN', {
//                           dateStyle: 'medium',
//                           timeStyle: 'short',
//                           timeZone: 'Asia/Kolkata',
//                         })}
//                       </p>
//                     </div>
//                     <span
//                       className={cn(
//                         'ml-2 px-2 py-1 rounded-full text-xs font-semibold',
//                         alert.type === 'critical' && 'bg-red-500/20 text-red-300',
//                         alert.type === 'warning' && 'bg-yellow-500/20 text-yellow-300',
//                         alert.type === 'info' && 'bg-blue-500/20 text-blue-300'
//                       )}
//                     >
//                       {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Close Button */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={() => setShowAlerts(false)}
//                 className="px-5 py-2 rounded-md bg-primary-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };










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
  Bell,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showAlerts, setShowAlerts] = React.useState(false);

  // Mock alerts data (replace with actual data from API or context)
  const alerts = [
    {
      id: 1,
      message: 'Monitor in Server Room is not working',
      date: '2025-05-22T14:00:00Z',
      type: 'critical',
    },
    {
      id: 2,
      message: 'WiFi Router in IOT Lab needs maintenance',
      date: '2025-05-22T13:30:00Z',
      type: 'warning',
    },
    {
      id: 3,
      message: 'AC in CEO Cabin is functioning normally',
      date: '2025-05-22T12:15:00Z',
      type: 'info',
    },
  ];

  return (
    <nav
      className={cn(
        'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 left-0 right-0 z-[100] transition-all duration-300'
      )}
    >
      <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => {
              console.log('Toggling sidebar, isSidebarOpen:', isSidebarOpen);
              onToggleSidebar();
            }}
            className={cn(
              'p-1 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-2 hover:border-primary-500 dark:hover:border-primary-400 mr-2 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden'
            )}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>

          <div className="flex items-center">
            <Laptop2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" />
            <span
              className={cn(
                'ml-1 sm:ml-2 text-lg sm:text-xl font-semibold text-gray-800 dark:text-white',
                'hidden sm:inline-block'
              )}
            >
              Etrack
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />

          {/* Alert Icon */}
          <button
            onClick={() => setShowAlerts(true)}
            className="relative p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="View alerts"
          >
            <Bell className="h-6 w-6" />
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {alerts.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm sm:text-base">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline-block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
              </button>

              {showUserMenu && (
                <div
                  className={cn(
                    'absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-[120] animate-fade-in'
                  )}
                >
                  <div className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>

                  <button
                    className={cn(
                      'flex w-full items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300',
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
                      'flex w-full items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300',
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
              leftIcon={<User className="h-3 w-3 sm:h-4 sm:w-4" />}
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            className={cn(
              'relative w-full max-w-md rounded-2xl p-6',
              'shadow-lg shadow-black/10 dark:shadow-white/10',
              'bg-white/10 dark:bg-white/10 backdrop-blur-md',
              'border border-white/20 ring-1 ring-white/20',
              'text-white transition-colors duration-300'
            )}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl hover:border-2 hover:border-primary-500 dark:hover:border-primary-400 rounded-md p-1"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Profile Initial */}
            <div className="flex flex-col items-center space-y-3 mb-5">
              <div className="h-24 w-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl shadow-xl ring-4 ring-white/40">
                {user.name?.charAt(0) || 'S'}
              </div>
              <h2 className="text-xl font-bold">{user.name || 'Sandhya Korimi'}</h2>
              <p className="text-sm text-white">{user.role || 'Admin'}</p>
            </div>

            {/* Profile Details with Icons */}
            <div className="w-full flex flex-col items-center space-y-4 text-sm">
              <div className="flex w-72 items-center">
                <Mail className="w-4 h-4 mr-2 text-white" />
                <span className="font-semibold w-28">Email</span>
                <strong className="mx-1">:</strong>
                <span>{user.email || 'sandhya@3344'}</span>
              </div>

              <div className="flex w-72 items-center">
                <User className="w-4 h-4 mr-2 text-white" />
                <span className="font-semibold w-28">Username</span>
                <strong className="mx-1">:</strong>
                <span>{user.username || 'sandhya_k'}</span>
              </div>

              <div className="flex w-72 items-center">
                <Phone className="w-4 h-4 mr-2 text-white" />
                <span className="font-semibold w-28">Phone</span>
                <strong className="mx-1">:</strong>
                <span>{user.phone || '+91 9876543210'}</span>
              </div>

              <div className="flex w-72 items-center">
                <Briefcase className="w-4 h-4 mr-2 text-white" />
                <span className="font-semibold w-28">Role</span>
                <strong className="mx-1">:</strong>
                <span>{user.role || 'Admin'}</span>
              </div>

              <div className="flex w-72 items-center">
                <MapPin className="w-4 h-4 mr-2 text-white" />
                <span className="font-semibold w-28">Location</span>
                <strong className="mx-1">:</strong>
                <span>{user.location || 'Andhra Pradesh, India'}</span>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowProfile(false)}
                className="px-5 py-2 rounded-md bg-primary-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Modal */}
      {showAlerts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            className={cn(
              'relative w-full max-w-md rounded-2xl p-6',
              'shadow-lg shadow-black/10 dark:shadow-white/10',
              'bg-white/10 dark:bg-white/10 backdrop-blur-md',
              'border border-white/20 ring-1 ring-white/20',
              'text-white transition-colors duration-300'
            )}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAlerts(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl hover:border-2 hover:border-primary-500 dark:hover:border-primary-400 rounded-md p-1"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-center mb-5">
              <Bell className="h-8 w-8 text-white mr-2" />
              <h2 className="text-xl font-bold">Alerts</h2>
            </div>

            {/* Alerts List */}
            <div className="max-h-80 overflow-y-auto space-y-4">
              {alerts.length === 0 ? (
                <p className="text-center text-white">No alerts available.</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-300 mt-1">
                        {new Date(alert.date).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                          timeZone: 'Asia/Kolkata',
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'ml-2 px-2 py-1 rounded-full text-xs font-semibold',
                        alert.type === 'critical' && 'bg-red-500/20 text-red-300',
                        alert.type === 'warning' && 'bg-yellow-500/20 text-yellow-300',
                        alert.type === 'info' && 'bg-blue-500/20 text-blue-300'
                      )}
                    >
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAlerts(false)}
                className="px-5 py-2 rounded-md bg-primary-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition text-sm"
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