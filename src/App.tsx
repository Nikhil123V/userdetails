import  { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserCard } from './components/UserCard';
import { UserDetail } from './components/UserDetail';
import { User } from './types/user';
import { ArrowDownAZ, ArrowUpZA, Loader2, Sun, Moon } from 'lucide-react';
//import logo from './logo.png';
import logo from './assets/logo.png';



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, sortDirection]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <nav className="bg-white shadow-md rounded-lg p-4 mb-6  flex justify-center items-center ">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">    .   </a>    
            

            </li>
            
           
          </ul>
        </nav>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-200">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {selectedUser ? (
          <UserDetail 
            user={selectedUser} 
            onBack={() => setSelectedUser(null)} 
            darkMode={darkMode}
          />
        ) : (
          <>
           <nav className="bg-gray-400 shadow-md rounded-lg p-4 mb-6  flex justify-center items-center ">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">           
              <img
  src={logo}
  alt='logo'
  height={250}
  width={200}
  className='border-4 rounded-xl'
/>
</a>
            </li>
            
           
          </ul>
        </nav>
            <div className="mb-6 space-y-4">

              <div className="flex justify-between items-center">
             
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar 
                    value={searchTerm} 
                    onChange={setSearchTerm}
                    darkMode={darkMode}
                  />
                </div>
                <button
                  onClick={toggleSort}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Sort
                  {sortDirection === 'asc' ? (
                    <ArrowDownAZ className="ml-2 w-4 h-4" />
                  ) : (
                    <ArrowUpZA className="ml-2 w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                    darkMode={darkMode}
                  />
                ))}
              </div>
              
            )}
    
          </>
        )}
      </div>
    </div>
  );
}

export default App;