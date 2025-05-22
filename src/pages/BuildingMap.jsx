import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildingData } from '../data/mockData';

export const BuildingMap = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(null);

  const totalFloors = buildingData.floors.length;

  // Calculate total properties and status counts for each floor
  const floorStats = buildingData.floors.map(floor => {
    const properties = floor.halls.flatMap(hall => 
      hall.rooms.flatMap(room => room.properties)
    );
    
    return {
      id: floor.id,
      totalProperties: properties.length,
      workingProperties: properties.filter(p => p.status === 'working').length,
      notWorkingProperties: properties.filter(p => p.status === 'not_working').length,
    };
  });

  const handleFloorClick = (floorId) => {
    setSelectedFloor(floorId);
  };

  const handleHallClick = (floorId, hallId) => {
    navigate(`/floors/${floorId}/halls/${hallId}`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Building Map</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore the building's structure and equipment distribution
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Building visualization */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Building Structure</h2>
          
          <div className="relative space-y-4 max-w-4xl mx-auto">
            {/* Floor selector */}
            <div className="absolute top-0 left-0 bottom-0 w-16 flex flex-col justify-center space-y-3">
              {[...Array(totalFloors)].map((_, index) => {
                const floorId = totalFloors + 1 - index;
                const floor = buildingData.floors.find(f => f.id === floorId);
                
                if (!floor) return null;
                
                const isSelected = selectedFloor === floorId;
                const stats = floorStats.find(s => s.id === floorId);
                
                const healthPercentage = stats && stats.totalProperties > 0
                  ? Math.round((stats.workingProperties / stats.totalProperties) * 100)
                  : 100;
                
                // Set floor button health indicator color based on health percentage
                // Healthy: 70-100% (green), Needs Attention: 50-69% (yellow), Critical: 0-49% (red)
                let healthColor = 'bg-green-500';
                // if (healthPercentage < 70) healthColor = 'bg-yellow-500';
                // if (healthPercentage < 50) healthColor = 'bg-red-500';
                
                return (
                  <button 
                    key={floorId}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg text-sm font-medium transition-all duration-300
                      ${isSelected 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ring-2 ring-blue-500'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    onClick={() => handleFloorClick(floorId)}
                  >
                    <div className="relative">
                      <span>{floorId}</span>
                      {stats && stats.totalProperties > 0 && (
                        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${healthColor} ring-1 ring-white dark:ring-gray-800`}></span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Floor visualization */}
            {selectedFloor ? (
              <div className="ml-20 animate-fade-in">
                <h3 className="text-lg font-medium mb-4 text-center text-gray-900 dark:text-white">
                  Floor {selectedFloor}
                </h3>
                
                <div className="space-y-4">
                  {/* Center/Outdoor/Corridor Hall */}
                  {(() => {
                    const floor = buildingData.floors.find(f => f.id === selectedFloor);
                    const centerHall = floor?.halls.find(h => h.name === 'Center' || h.name === 'Outdoor' || h.name === 'Corridor');
                    
                    if (!centerHall) {
                      return (
                        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 border border-gray-300 dark:border-gray-600 text-center">
                          <p className="text-gray-600 dark:text-gray-400">No Corridor or Outdoor hall found for this floor.</p>
                        </div>
                      );
                    }
                    
                    const hallProps = centerHall.rooms.flatMap(room => room.properties);
                    const workingCount = hallProps.filter(p => p.status === 'working').length;
                    const healthPercentage = hallProps.length > 0
                      ? Math.round((workingCount / hallProps.length) * 100)
                      : 100;
                    
                    // Set Center/Outdoor/Corridor hall to yellow gradient regardless of health percentage
                    let healthColor = 'from-yellow-500 to-yellow-400';
                    let textColor = 'text-gray-900';
                    let borderColor = 'border-gray-300 dark:border-gray-600';
                    // Uncomment for dynamic health colors
                    // if (healthPercentage < 70) {
                    //   healthColor = 'from-yellow-500 to-yellow-400';
                    //   textColor = 'text-gray-900';
                    // }
                    // if (healthPercentage < 50) {
                    //   healthColor = 'from-red-500 to-red-400';
                    //   textColor = 'text-white';
                    // }
                    
                    return (
                      <div 
                        key={centerHall.id}
                        className={`bg-gradient-to-r ${healthColor} rounded-lg p-4 border ${borderColor} cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-md mx-auto`}
                        onClick={() => handleHallClick(selectedFloor, centerHall.id)}
                      >
                        <h4 className={`font-medium ${textColor} mb-2 text-center text-lg`}>{centerHall.name}</h4>
                        <div className={`flex flex-row flex-wrap gap-2 ${centerHall.rooms.length === 1 ? 'justify-center' : 'justify-center'}`}>
                          {centerHall.rooms.map(room => {
                            const roomProps = room.properties;
                            const roomWorking = roomProps.filter(p => p.status === 'working').length;
                            const roomHealth = roomProps.length > 0
                              ? Math.round((roomWorking / roomProps.length) * 100)
                              : 100;
                            
                            let roomBg = 'bg-white bg-opacity-90';
                            // if (roomHealth < 70) roomBg = 'bg-white bg-opacity-75';
                            // if (roomHealth < 50) roomBg = 'bg-white bg-opacity-60';
                            
                            return (
                              <div 
                                key={room.id}
                                className={`${roomBg} p-2 rounded text-center ${roomProps.length > 0 ? 'text-gray-800' : 'text-gray-500'} w-32`}
                              >
                                <p className="text-sm font-medium truncate">{room.name}</p>
                                <p className="text-xs">{roomProps.length} items</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Left and Right Wings */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {buildingData.floors
                      .find(f => f.id === selectedFloor)
                      ?.halls.filter(h => h.name === 'Left Wing' || h.name === 'Right Wing')
                      .map(hall => {
                        const hallProps = hall.rooms.flatMap(room => room.properties);
                        const workingCount = hallProps.filter(p => p.status === 'working').length;
                        const healthPercentage = hallProps.length > 0
                          ? Math.round((workingCount / hallProps.length) * 100)
                          : 100;
                        
                        // Set wing hall color based on health percentage
                        // Healthy: 70-100% (green), Needs Attention: 50-69% (yellow), Critical: 0-49% (red)
                        let healthColor = 'from-green-500 to-green-400';
                        let textColor = 'text-white';
                        let borderColor = 'border-gray-300 dark:border-gray-600';
                        // if (healthPercentage < 70) {
                        //   healthColor = 'from-yellow-500 to-yellow-400';
                        //   textColor = 'text-gray-900';
                        // }
                        // if (healthPercentage < 50) {
                        //   healthColor = 'from-red-500 to-red-400';
                        //   textColor = 'text-white';
                        // }
                        
                        return (
                          <div 
                            key={hall.id}
                            className={`bg-gradient-to-r ${healthColor} rounded-lg p-4 border ${borderColor} cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-1/2 max-w-md`}
                            onClick={() => handleHallClick(selectedFloor, hall.id)}
                          >
                            <h4 className={`font-medium ${textColor} mb-2 text-center`}>{hall.name}</h4>
                            <div className={`flex flex-row flex-wrap gap-2 ${hall.rooms.length === 1 ? 'justify-center' : 'justify-start'}`}>
                              {hall.rooms.map(room => {
                                const roomProps = room.properties;
                                const roomWorking = roomProps.filter(p => p.status === 'working').length;
                                const roomHealth = roomProps.length > 0
                                  ? Math.round((roomWorking / roomProps.length) * 100)
                                  : 100;
                                
                                let roomBg = 'bg-white bg-opacity-90';
                                // if (roomHealth < 70) roomBg = 'bg-white bg-opacity-75';
                                // if (roomHealth < 50) roomBg = 'bg-white bg-opacity-60';
                                
                                return (
                                  <div 
                                    key={room.id}
                                    className={`${roomBg} p-2 rounded text-center ${roomProps.length > 0 ? 'text-gray-800' : 'text-gray-500'} w-32`}
                                  >
                                    <p className="text-sm font-medium truncate">{room.name}</p>
                                    <p className="text-xs">{roomProps.length} items</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="ml-20 flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a floor to view its layout
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Building stats */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Building Stats</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Floors</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">{totalFloors}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Sections</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {buildingData.floors.reduce((acc, floor) => acc + floor.halls.length, 0)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Rooms</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {buildingData.floors.reduce(
                    (acc, floor) => acc + floor.halls.reduce(
                      (hallAcc, hall) => hallAcc + hall.rooms.length, 0
                    ), 0
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Floor health */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Floor Health</h2>
            
            <div className="space-y-4">
              {floorStats.map(stats => {
                const healthPercentage = stats.totalProperties > 0
                  ? Math.round((stats.workingProperties / stats.totalProperties) * 100)
                  : 100;
                
                // Set floor health bar color based on health percentage
                // Healthy: 70-100% (green), Needs Attention: 50-69% (yellow), Critical: 0-49% (red)
                let healthColor = 'bg-green-500';
                // if (healthPercentage < 70) healthColor = 'bg-yellow-500';
                // if (healthPercentage < 50) healthColor = 'bg-red-500';
                
                return (
                  <div key={stats.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Floor {stats.id}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stats.workingProperties}/{stats.totalProperties} working
                      </p>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`${healthColor} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${healthPercentage}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-xs text-right text-gray-600 dark:text-gray-400">
                      {healthPercentage}% healthy
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Legend */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Map Legend</h2>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2 shadow-md"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Healthy (70-100%)</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2 shadow-md"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Needs Attention (50-69%)</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2 shadow-md"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Critical (0-49%)</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};