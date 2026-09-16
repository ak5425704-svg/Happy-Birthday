/**
 * Helper to persist custom magazine state, photos, and edits in localStorage
 */

export function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`ramsha_mag_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`ramsha_mag_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

/**
 * Reads a File object as a base64 data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
