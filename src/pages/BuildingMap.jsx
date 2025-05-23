import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildingData } from '../data/mockData';

export const BuildingMap = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(null);

  // Safeguard for buildingData.floors, ensure at least 5 floors
  const totalFloors = Math.max(buildingData?.floors?.length || 0, 5);

  // Calculate total properties and status counts for each floor
  const floorStats = (buildingData?.floors || []).map(floor => {
    const properties = floor.halls?.flatMap(hall => 
      hall.rooms?.flatMap(room => room.properties) || []
    ) || [];
    
    return {
      id: floor.id,
      totalProperties: properties.length,
      workingProperties: properties.filter(p => p.status === 'working').length,
      notWorkingProperties: properties.filter(p => p.status === 'not_working').length,
    };
  });

  // Fallback for 5th floor if not in buildingData
  const getFloorData = (floorId) => {
    const floor = buildingData?.floors?.find(f => f.id === floorId);
    if (floor) return floor;
    if (floorId === 5) {
      return {
        id: 5,
        halls: [
          {
            id: 'center-5',
            name: 'Center',
            rooms: [
              { id: 'room-5-1', name: 'Room 5-1', properties: [] },
              { id: 'room-5-2', name: 'Room 5-2', properties: [] },
            ],
          },
          {
            id: 'left-wing-5',
            name: 'Left Wing',
            rooms: [
              { id: 'room-5-3', name: 'Room 5-3', properties: [] },
              { id: 'room-5-4', name: 'Room 5-4', properties: [] },
            ],
          },
          {
            id: 'right-wing-5',
            name: 'Right Wing',
            rooms: [
              { id: 'room-5-5', name: 'Server Room', properties: [] },
              { id: 'room-5-6', name: 'Room 5-6', properties: [] },
            ],
          },
        ],
      };
    }
    return null;
  };

  const handleFloorClick = (floorId) => {
    setSelectedFloor(floorId);
  };

  const handleHallClick = (floorId, hallId) => {
    navigate(`/floors/${floorId}/halls/${hallId}`);
  };

  return (
    <div className="space-y-4 p-3 sm:p-3 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Building Map</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore the building's structure and equipment distribution
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Building visualization */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <h2 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">Building Structure</h2>
          
          <div className="space-y-3 max-w-4xl mx-auto">
            {/* Floor selector */}
            <div className="flex flex-row flex-wrap gap-2 justify-center mb-4">
              {[...Array(totalFloors)].map((_, index) => {
                const floorId = index + 1; // Ascending order
                const floor = getFloorData(floorId);
                
                if (!floor) return null;
                
                const isSelected = selectedFloor === floorId;
                
                return (
                  <button 
                    key={floorId}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300
                      ${isSelected 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ring-2 ring-green-500'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    onClick={() => handleFloorClick(floorId)}
                  >
                    Floor {floorId}
                  </button>
                );
              })}
            </div>
            
            {/* Floor visualization */}
            {selectedFloor ? (
              <div className="animate-fade-in">
                <h3 className="text-lg font-medium mb-3 text-center text-gray-900 dark:text-white">
                  Floor {selectedFloor}
                </h3>
                
                <div className="space-y-4">
                  {/* Center/Outdoor Hall */}
                  {(() => {
                    const floor = buildingData.floors.find(f => f.id === selectedFloor);
                    const centerHall = floor?.halls.find(h => h.name === 'Center' || h.name === 'Outdoor');
                    
                    if (!centerHall) {
                      return (
                        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 border border-gray-300 dark:border-gray-600 text-center">
                          <p className="text-gray-600 dark:text-gray-400">No Corridor or Outdoor hall found for this floor.</p>
                        </div>
                      );
                    }
                    
                    const hallProps = centerHall.rooms?.flatMap(room => room.properties || []) || [];
                    const workingCount = hallProps.filter(p => p.status === 'working').length;
                    const healthPercentage = hallProps.length > 0
                      ? Math.round((workingCount / hallProps.length) * 100)
                      : 100;
                    
                    // Set Center/Outdoor hall to yellow gradient regardless of health percentage
                    // Text color is gray-900 for readability on yellow background
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
                        className={`bg-gradient-to-r ${healthColor} rounded-lg p-3 border ${borderColor} cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-md mx-auto flex-shrink-0`}
                        onClick={() => handleHallClick(selectedFloor, centerHall.id)}
                      >
                        <h4 className={`font-medium ${textColor} mb-2 text-center text-lg`}>{centerHall.name}</h4>
                        <div className={`flex flex-row flex-wrap gap-2 ${centerHall.rooms?.length === 1 ? 'justify-center' : 'justify-center'} max-w-full`}>
                          {centerHall.rooms?.map(room => {
                            const roomProps = room.properties || [];
                            const roomWorking = roomProps.filter(p => p.status === 'working').length;
                            const roomHealth = roomProps.length > 0
                              ? Math.round((roomWorking / roomProps.length) * 100)
                              : 100;
                            
                            let roomBg = 'bg-white bg-opacity-90';
                            
                            return (
                              <div 
                                key={room.id}
                                className={`${roomBg} p-3 rounded text-center ${roomProps.length > 0 ? 'text-gray-800' : 'text-gray-500'} w-24 shrink-0`}
                              >
                                <p className="text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap">{room.name}</p>
                                <p className="text-xs">{roomProps.length} items</p>
                              </div>
                            );
                          }) || <p className="text-gray-500">No rooms available</p>}
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
                                
                                // Set room background opacity based on room health
                                // Healthy: 70-100% (90% opacity), Needs Attention: 50-69% (75% opacity), Critical: 0-49% (60% opacity)
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
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a floor to view its layout
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Building stats */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Building Stats</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Floors</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">{totalFloors}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Sections</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {buildingData?.floors?.reduce((acc, floor) => acc + (floor.halls?.length || 0), 0) || 0}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Rooms</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {buildingData?.floors?.reduce(
                    (acc, floor) => acc + (floor.halls?.reduce(
                      (hallAcc, hall) => hallAcc + (hall.rooms?.length || 0), 0
                    ) || 0), 0
                  ) || 0}
                </p>
              </div>
            </div>
          </div>
          
          {/* Floor health */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Floor Health</h2>
            
            <div className="space-y-3">
              {floorStats.map(stats => {
                const healthPercentage = stats.totalProperties > 0
                  ? Math.round((stats.workingProperties / stats.totalProperties) * 100)
                  : 100;
                
                 let healthColor = healthPercentage >= 80 ? 'bg-green-500' : 'bg-red-500';
                
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
        </div>
      </div>
    </div>
  );
};