import React, { createContext, useState, useContext, useEffect } from 'react';

const SaveContext = createContext();

export const useSave = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
};

const API_URL = 'http://localhost:5000/api';

export const SaveProvider = ({ children }) => {
  const [saveData, setSaveData] = useState({
    stars: {
      tutorial: 0,
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0,
    },
    settings: {
      language: 'italiano',
      musicVolume: 10,
      sfxVolume: 50,
    },
    lastSaved: null,
  });

  // Carica i dati all'avvio
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_URL}/save`);
        if (response.ok) {
          const data = await response.json();
          setSaveData(data);
        }
      } catch (error) {
        console.error('Error loading save data:', error);
      }
    };
    loadData();
  }, []);

  // Salva i dati sul backend
  const save = async (dataToSave = null) => {
    try {
      const data = dataToSave || saveData;
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const result = await response.json();
        setSaveData(result.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  };

  // Aggiorna le stelle per un livello specifico
  const updateStars = async (levelId, stars) => {
    try {
      const response = await fetch(`${API_URL}/save/stars/${levelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stars }),
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.updated) {
          // Aggiorna lo stato locale solo se il backend ha salvato
          setSaveData(prev => ({
            ...prev,
            stars: {
              ...prev.stars,
              [levelId]: result.stars,
            },
            lastSaved: new Date().toISOString(),
          }));
        }
        return result.updated;
      }
      return false;
    } catch (error) {
      console.error('Error updating stars:', error);
      return false;
    }
  };

  // Aggiorna le impostazioni
  const updateSettings = (settings) => {
    setSaveData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings,
      },
    }));
  };

  // Ottieni le stelle per un livello
  const getStars = (levelId) => {
    return saveData.stars[levelId] || 0;
  };

  // Ottieni il totale delle stelle
  const getTotalStars = () => {
    return Object.values(saveData.stars).reduce((a, b) => a + b, 0);
  };

  // Resetta i dati di salvataggio
  const resetSave = async () => {
    const defaultData = {
      stars: {
        tutorial: 0,
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
        level7: 0,
        level8: 0,
        level9: 0,
      },
      settings: {
        language: 'italiano',
        musicVolume: 10,
        sfxVolume: 50,
      },
      lastSaved: null,
    };
    
    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setSaveData(result.data);
      }
    } catch (error) {
      console.error('Error resetting save:', error);
    }
  };

  return (
    <SaveContext.Provider value={{
      saveData,
      save,
      updateStars,
      updateSettings,
      getStars,
      getTotalStars,
      resetSave,
    }}>
      {children}
    </SaveContext.Provider>
  );
};
