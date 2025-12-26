import React, { useState } from 'react';
import { AddressData } from '../model/types';
import { Card } from "@/shared/ui/card";
import { Map, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  data: AddressData[];
}

export const AddressTable = ({ data }: Props) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  if (data.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* 파워업: 선택된 주소 시각화 프리뷰 */}
      <AnimatePresence mode="wait">
        {selectedIdx !== null && (
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
              <Map className="w-10 h-10" />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Selected Location</p>
              <h4 className="text-xl font-bold">{data[selectedIdx].roadAddress}</h4>
              <p className="text-sm text-muted-foreground">{data[selectedIdx].jibunAddress}</p>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-xl border border-white/5 text-xs font-mono">
              <div className="flex items-center gap-2 text-indigo-300">
                <Navigation className="w-3 h-3" />
                {data[selectedIdx].latitude.toFixed(6)}, {data[selectedIdx].longitude.toFixed(6)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="overflow-hidden border-primary/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4 text-center">선택</th>
                <th className="px-6 py-4">우편번호</th>
                <th className="px-6 py-4">도로명 주소</th>
                <th className="px-6 py-4">좌표</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {data.map((item, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelectedIdx(i)}
                  className={`cursor-pointer transition-colors ${selectedIdx === i ? 'bg-indigo-500/10' : 'hover:bg-primary/5'}`}
                >
                  <td className="px-6 py-4 text-center">
                    <div className={`w-4 h-4 rounded-full border-2 mx-auto ${selectedIdx === i ? 'border-indigo-500 bg-indigo-500' : 'border-muted'}`} />
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-indigo-400">{item.zipCode}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{item.roadAddress}</div>
                    <div className="text-[10px] text-muted-foreground">{item.detailAddress}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-mono opacity-50">{item.latitude.toFixed(2)}, {item.longitude.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};