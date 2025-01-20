import React from 'react';
import { User } from '../types/user';
import { Building2, Globe, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

interface UserDetailProps {
  user: User;
  onBack: () => void;
  darkMode: boolean;
}

export function UserDetail({ user, onBack, darkMode }: UserDetailProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to users
      </button>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{user.company.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                <p className="text-gray-900 dark:text-white">{user.website}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-900 dark:text-white">
                  {user.address.street}, {user.address.suite}
                  <br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                <p className="text-gray-900 dark:text-white">{user.company.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.company.catchPhrase}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}