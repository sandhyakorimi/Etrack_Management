import React from 'react';
import { Button } from '../ui/Button';
import { X, Monitor, Keyboard, Mouse, Fan, Lightbulb, Wifi, AirVent } from 'lucide-react';
import { cn } from '../../utils/cn';

const propertyIcons = {
  monitor: <Monitor className="h-8 w-8" />,
  keyboard: <Keyboard className="h-8 w-8" />,
  mouse: <Mouse className="h-8 w-8" />,
  fan: <Fan className="h-8 w-8" />,
  light: <Lightbulb className="h-8 w-8" />,
  router: <Wifi className="h-8 w-8" />,
  ac: <AirVent className="h-8 w-8" />,
};

export const PropertyModal = ({ property, onClose }) => {
  // Format type for display
  const formatType = (type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Property Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className={cn(
              "p-4 rounded-full mr-4",
              property.status === 'working' 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                : 'bg-error-100 dark:bg-error-900 text-error-600 dark:text-error-400'
            )}>
              {propertyIcons[property.type]}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {formatType(property.type)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {property.brand} {property.model}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Status
              </h4>
              <div className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                property.status === 'working' 
                  ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' 
                  : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300'
              )}>
                {property.status === 'working' ? 'Working' : 'Not Working'}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Brand
              </h4>
              <p className="text-gray-900 dark:text-white">{property.brand}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Model
              </h4>
              <p className="text-gray-900 dark:text-white">{property.model}</p>
            </div>
            
            {property.purchaseDate && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Purchase Date
                </h4>
                <p className="text-gray-900 dark:text-white">{property.purchaseDate}</p>
              </div>
            )}
            
            {property.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Notes
                </h4>
                <p className="text-gray-900 dark:text-white">{property.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
