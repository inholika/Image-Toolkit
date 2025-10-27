
'use client';

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DpiControlProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const dpiPresets = [
  { value: '72', label: '72 DPI (Screen)' },
  { value: '96', label: '96 DPI (Web)' },
  { value: '300', label: '300 DPI (Print)' },
];

export function DpiControl({ value, onChange, disabled }: DpiControlProps) {
  const isCustom = !dpiPresets.some(p => p.value === String(value));
  const [selectedValue, setSelectedValue] = useState(isCustom ? 'custom' : String(value));

  useEffect(() => {
    const isValueCustom = !dpiPresets.some(p => p.value === String(value));
    setSelectedValue(isValueCustom ? 'custom' : String(value));
  }, [value]);

  const handleSelectChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (newValue !== 'custom') {
      onChange(Number(newValue));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Select
        value={selectedValue}
        onValueChange={handleSelectChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select DPI" />
        </SelectTrigger>
        <SelectContent>
          {dpiPresets.map(preset => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value) || 0)}
        disabled={disabled || selectedValue !== 'custom'}
        className={cn(selectedValue !== 'custom' && 'bg-muted/50')}
      />
    </div>
  );
}

    