import { useState, useCallback } from 'react';
import { AddressData, GenerationOptions } from '../model/types';

const FULL_CITIES = [
  "서울특별시", "경기도", "부산광역시", "인천광역시", "대구광역시", "대전광역시", 
  "광주광역시", "울산광역시", "세종특별자치시", "강원도", "충청북도", "충청남도", 
  "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
];

export function useAddressGenerator() {
  const [options, setOptions] = useState<GenerationOptions>({
    count: 5,
    includeCoordinates: true,
    includeDetail: true,
    format: 'json',
  });

  const [data, setData] = useState<AddressData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(() => {
    setIsGenerating(true);
    const result: AddressData[] = [];
    
    for (let i = 0; i < options.count; i++) {
      const city = FULL_CITIES[Math.floor(Math.random() * FULL_CITIES.length)];
      const district = "중구"; // 데이터 확장을 가정
      const road = "중앙대로";
      const buildingNum = Math.floor(Math.random() * 500) + 1;
      
      result.push({
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        roadAddress: `${city} ${district} ${road} ${buildingNum}`,
        jibunAddress: `${city} ${district} 동동동 ${buildingNum}-${Math.floor(Math.random() * 10)}`,
        detailAddress: options.includeDetail ? `${Math.floor(Math.random() * 20) + 1}층 ${Math.floor(Math.random() * 1000) + 101}호` : '',
        latitude: 33 + (Math.random() * 5),
        longitude: 126 + (Math.random() * 3),
      });
    }

    setTimeout(() => {
      setData(result);
      setIsGenerating(false);
    }, 600);
  }, [options]);

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return { options, setOptions, data, isGenerating, generate, downloadFile };
}