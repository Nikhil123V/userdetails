import React from 'react';
import { User } from '../types/user';
import { Building2, Mail, MapPin } from 'lucide-react';

interface UserCardProps {
  user: User;
  onClick: () => void;
  darkMode: boolean;
}

export function UserCard({ user, onClick, darkMode }: UserCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{user.address.city}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Building2 className="w-4 h-4 mr-2" />
              <span className="text-sm">{user.company.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}