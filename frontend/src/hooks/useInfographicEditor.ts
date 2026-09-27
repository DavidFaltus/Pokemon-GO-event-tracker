import { useState, useEffect, useCallback } from 'react';

interface InfographicOverrides {
  textOverrides: Record<string, string>;
  imageOverrides: Record<string, string>;
  listOverrides: Record<string, any[]>;
  backgroundOverride?: string;
}

export function useInfographicEditor(eventId: string, infographicType: string) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [overrides, setOverrides] = useState<InfographicOverrides>({
    textOverrides: {},
    imageOverrides: {},
    listOverrides: {},
    backgroundOverride: undefined
  });

  const getStorageKey = useCallback(() => {
    return `pogo_infographic_overrides_${infographicType}_${eventId}`;
  }, [eventId, infographicType]);

  useEffect(() => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setOverrides(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse infographic overrides from localStorage', e);
        setOverrides({
          textOverrides: {},
          imageOverrides: {},
          listOverrides: {},
          backgroundOverride: undefined
        });
      }
    } else {
      setOverrides({
        textOverrides: {},
        imageOverrides: {},
        listOverrides: {},
        backgroundOverride: undefined
      });
    }
  }, [getStorageKey]);

  const saveOverrides = useCallback((newOverrides: InfographicOverrides) => {
    setOverrides(newOverrides);
    localStorage.setItem(getStorageKey(), JSON.stringify(newOverrides));
  }, [getStorageKey]);

  const getTextOverride = useCallback((fieldKey: string, defaultValue: string): string => {
    return overrides.textOverrides[fieldKey] !== undefined ? overrides.textOverrides[fieldKey] : defaultValue;
  }, [overrides.textOverrides]);

  const setTextOverride = useCallback((fieldKey: string, value: string) => {
    setOverrides((prev) => {
      const updated = {
        ...prev,
        textOverrides: {
          ...prev.textOverrides,
          [fieldKey]: value
        }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const getImageOverride = useCallback((fieldKey: string, defaultUrl: string): string => {
    return overrides.imageOverrides[fieldKey] !== undefined ? overrides.imageOverrides[fieldKey] : defaultUrl;
  }, [overrides.imageOverrides]);

  const setImageOverride = useCallback((fieldKey: string, url: string) => {
    setOverrides((prev) => {
      const updated = {
        ...prev,
        imageOverrides: {
          ...prev.imageOverrides,
          [fieldKey]: url
        }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const getListOverride = useCallback(<T,>(fieldKey: string, defaultList: T[]): T[] => {
    return overrides.listOverrides[fieldKey] !== undefined ? overrides.listOverrides[fieldKey] as T[] : defaultList;
  }, [overrides.listOverrides]);

  const setListOverride = useCallback(<T,>(fieldKey: string, list: T[]) => {
    setOverrides((prev) => {
      const updated = {
        ...prev,
        listOverrides: {
          ...prev.listOverrides,
          [fieldKey]: list
        }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const addListItem = useCallback(<T,>(fieldKey: string, defaultList: T[], newItem: T) => {
    setOverrides((prev) => {
      const currentList = prev.listOverrides[fieldKey] !== undefined ? prev.listOverrides[fieldKey] as T[] : defaultList;
      const updated = {
        ...prev,
        listOverrides: {
          ...prev.listOverrides,
          [fieldKey]: [...currentList, newItem]
        }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const removeListItem = useCallback((fieldKey: string, defaultList: any[], index: number) => {
    setOverrides((prev) => {
      const currentList = prev.listOverrides[fieldKey] !== undefined ? prev.listOverrides[fieldKey] : defaultList;
      const newList = [...currentList];
      newList.splice(index, 1);
      const updated = {
        ...prev,
        listOverrides: {
          ...prev.listOverrides,
          [fieldKey]: newList
        }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const getBackgroundOverride = useCallback((defaultBg?: string): string | undefined => {
    return overrides.backgroundOverride !== undefined ? overrides.backgroundOverride : defaultBg;
  }, [overrides.backgroundOverride]);

  const setBackgroundOverride = useCallback((bgUrlOrKey: string | undefined) => {
    setOverrides((prev) => {
      const updated = {
        ...prev,
        backgroundOverride: bgUrlOrKey
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  }, [getStorageKey]);

  const resetAll = useCallback(() => {
    const emptyOverrides = {
      textOverrides: {},
      imageOverrides: {},
      listOverrides: {},
      backgroundOverride: undefined
    };
    setOverrides(emptyOverrides);
    localStorage.removeItem(getStorageKey());
  }, [getStorageKey]);

  const resetField = useCallback((fieldKey: string) => {
    setOverrides((prev) => {
      const newOverrides = { ...prev };
      
      if (newOverrides.textOverrides[fieldKey] !== undefined) {
        delete newOverrides.textOverrides[fieldKey];
      }
      if (newOverrides.imageOverrides[fieldKey] !== undefined) {
        delete newOverrides.imageOverrides[fieldKey];
      }
      if (newOverrides.listOverrides[fieldKey] !== undefined) {
        delete newOverrides.listOverrides[fieldKey];
      }
      if (fieldKey === 'backgroundOverride') {
        newOverrides.backgroundOverride = undefined;
      }
      
      localStorage.setItem(getStorageKey(), JSON.stringify(newOverrides));
      return newOverrides;
    });
  }, [getStorageKey]);

  const hasOverrides = Object.keys(overrides.textOverrides).length > 0 || 
                       Object.keys(overrides.imageOverrides).length > 0 || 
                       Object.keys(overrides.listOverrides).length > 0 ||
                       overrides.backgroundOverride !== undefined;

  return {
    getTextOverride,
    setTextOverride,
    getImageOverride,
    setImageOverride,
    getListOverride,
    setListOverride,
    getBackgroundOverride,
    setBackgroundOverride,
    addListItem,
    removeListItem,
    resetAll,
    resetField,
    hasOverrides,
    isEditing,
    setIsEditing,
    isExporting,
    setIsExporting
  };
}
