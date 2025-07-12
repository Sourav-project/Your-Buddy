import React, { useState } from 'react';
import { CustomAlert } from '../../types/professional';
import { Bell, Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface CustomAlertsManagerProps {
  alerts: CustomAlert[];
  onAddAlert: (alert: Omit<CustomAlert, 'id'>) => void;
  onEditAlert: (id: string, alert: Partial<CustomAlert>) => void;
  onDeleteAlert: (id: string) => void;
  onToggleAlert: (id: string) => void;
}

const CustomAlertsManager: React.FC<CustomAlertsManagerProps> = ({
  alerts,
  onAddAlert,
  onEditAlert,
  onDeleteAlert,
  onToggleAlert
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    parameter: 'temperature' as CustomAlert['parameter'],
    condition: 'above' as CustomAlert['condition'],
    threshold: 0
  });

  const parameters = [
    { value: 'temperature', label: 'Temperature (°C)', unit: '°C' },
    { value: 'wind', label: 'Wind Speed (km/h)', unit: 'km/h' },
    { value: 'precipitation', label: 'Precipitation (%)', unit: '%' },
    { value: 'humidity', label: 'Humidity (%)', unit: '%' },
    { value: 'pressure', label: 'Pressure (hPa)', unit: 'hPa' },
    { value: 'uv', label: 'UV Index', unit: '' }
  ];

  const conditions = [
    { value: 'above', label: 'Above' },
    { value: 'below', label: 'Below' },
    { value: 'equals', label: 'Equals' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const alertData = {
      ...formData,
      isActive: true,
      locations: [] // In real app, allow user to select locations
    };

    if (editingId) {
      onEditAlert(editingId, alertData);
      setEditingId(null);
    } else {
      onAddAlert(alertData);
    }

    setFormData({ name: '', parameter: 'temperature', condition: 'above', threshold: 0 });
    setShowAddForm(false);
  };

  const startEdit = (alert: CustomAlert) => {
    setFormData({
      name: alert.name,
      parameter: alert.parameter,
      condition: alert.condition,
      threshold: alert.threshold
    });
    setEditingId(alert.id);
    setShowAddForm(true);
  };

  const getParameterLabel = (parameter: CustomAlert['parameter']) => {
    return parameters.find(p => p.value === parameter)?.label || parameter;
  };

  const getParameterUnit = (parameter: CustomAlert['parameter']) => {
    return parameters.find(p => p.value === parameter)?.unit || '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Bell className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Custom Weather Alerts</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <Plus size={16} />
          <span>Add Alert</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., High Temperature Alert"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parameter
              </label>
              <select
                value={formData.parameter}
                onChange={(e) => setFormData({ ...formData, parameter: e.target.value as CustomAlert['parameter'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {parameters.map(param => (
                  <option key={param.value} value={param.value}>{param.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as CustomAlert['condition'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {conditions.map(cond => (
                  <option key={cond.value} value={cond.value}>{cond.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Threshold Value
              </label>
              <input
                type="number"
                value={formData.threshold}
                onChange={(e) => setFormData({ ...formData, threshold: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter threshold value"
                required
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              {editingId ? 'Update' : 'Create'} Alert
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({ name: '', parameter: 'temperature', condition: 'above', threshold: 0 });
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-800">{alert.name}</h4>
                  <button
                    onClick={() => onToggleAlert(alert.id)}
                    className="flex items-center space-x-1 text-sm"
                  >
                    {alert.isActive ? (
                      <ToggleRight className="text-green-600" size={20} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={20} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Alert when {getParameterLabel(alert.parameter).toLowerCase()} is{' '}
                  <span className="font-medium">{alert.condition} {alert.threshold}{getParameterUnit(alert.parameter)}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEdit(alert)}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell size={48} className="mx-auto mb-4 opacity-50" />
            <p>No custom alerts configured yet.</p>
            <p className="text-sm">Create your first alert to get notified about specific weather conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAlertsManager;