import React, { useState } from 'react';
import { BusinessLocation } from '../../types/professional';
import { MapPin, Plus, Edit, Trash2, Clock, Building } from 'lucide-react';

interface BusinessLocationsManagerProps {
  locations: BusinessLocation[];
  onAddLocation: (location: Omit<BusinessLocation, 'id'>) => void;
  onEditLocation: (id: string, location: Partial<BusinessLocation>) => void;
  onDeleteLocation: (id: string) => void;
  onSelectLocation: (location: BusinessLocation) => void;
  selectedLocationId?: string;
}

const BusinessLocationsManager: React.FC<BusinessLocationsManagerProps> = ({
  locations,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  onSelectLocation,
  selectedLocationId
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'office' as BusinessLocation['type'],
    timezone: 'UTC'
  });

  const locationTypes = [
    { value: 'office', label: 'Office', icon: Building },
    { value: 'site', label: 'Construction Site', icon: MapPin },
    { value: 'client', label: 'Client Location', icon: Building },
    { value: 'event', label: 'Event Venue', icon: MapPin },
    { value: 'warehouse', label: 'Warehouse', icon: Building },
    { value: 'other', label: 'Other', icon: MapPin }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock geocoding - in real app, use Google Maps API or similar
    const mockCoords = {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lon: -74.0060 + (Math.random() - 0.5) * 0.1
    };

    const locationData = {
      ...formData,
      lat: mockCoords.lat,
      lon: mockCoords.lon,
      isActive: true
    };

    if (editingId) {
      onEditLocation(editingId, locationData);
      setEditingId(null);
    } else {
      onAddLocation(locationData);
    }

    setFormData({ name: '', address: '', type: 'office', timezone: 'UTC' });
    setShowAddForm(false);
  };

  const startEdit = (location: BusinessLocation) => {
    setFormData({
      name: location.name,
      address: location.address,
      type: location.type,
      timezone: location.timezone
    });
    setEditingId(location.id);
    setShowAddForm(true);
  };

  const getTypeIcon = (type: BusinessLocation['type']) => {
    const typeConfig = locationTypes.find(t => t.value === type);
    const IconComponent = typeConfig?.icon || MapPin;
    return <IconComponent size={16} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Business Locations</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={16} />
          <span>Add Location</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Main Office, Site A"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as BusinessLocation['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full address"
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {editingId ? 'Update' : 'Add'} Location
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({ name: '', address: '', type: 'office', timezone: 'UTC' });
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`p-4 rounded-xl border transition-colors duration-200 cursor-pointer ${
              selectedLocationId === location.id
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onSelectLocation(location)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-gray-600">
                  {getTypeIcon(location.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{location.name}</h4>
                  <p className="text-sm text-gray-600">{location.address}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{location.timezone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(location);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLocation(location.id);
                  }}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {locations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin size={48} className="mx-auto mb-4 opacity-50" />
            <p>No business locations added yet.</p>
            <p className="text-sm">Add your first location to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessLocationsManager;