import { MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useSafeSelect } from '../hooks/useSafeSelect';

const DEPARTMENTS = [
  'Todos los departamentos',
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'El Progreso',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Petén',
  'Quetzaltenango',
  'Quiché',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa'
];

interface DepartmentFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function DepartmentFilter({ value, onChange }: DepartmentFilterProps) {
  const { handleValueChange, isTransitioning } = useSafeSelect(value);

  const handleChange = (newValue: string) => {
    handleValueChange(newValue);
    if (!isTransitioning) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 text-[#4997D0]" />
      <Select value={value} onValueChange={handleChange} disabled={isTransitioning}>
        <SelectTrigger className="h-9 w-[200px] bg-background border-border text-sm">
          <SelectValue placeholder="Filtrar por departamento" />
        </SelectTrigger>
        <SelectContent>
          {DEPARTMENTS.map((department) => (
            <SelectItem key={department} value={department}>
              {department}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
