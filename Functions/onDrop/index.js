import { useCallback } from 'react';

export default function onDropFunction(setImage) {
  return useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        const base64 = btoa(
          new Uint8Array(binaryStr)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        setImage(base64);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
}