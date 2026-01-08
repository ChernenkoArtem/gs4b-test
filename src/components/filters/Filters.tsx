import Select from '../select/Select.tsx';
import { useFilters } from '../../context/FiltersContext.tsx';
import { priorityOptions, statusOptions } from '../../data/filters.ts';
import { FormControl } from '@mui/material';

export default function Filters() {
  const filterContext = useFilters();

  return (
    <div
      css={{
        display: 'flex',
        padding: '1rem',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      <FormControl css={{ minWidth: '20%' }}>
        <Select
          name="Statuses"
          selected={filterContext?.filters.status || []}
          label="Statuses"
          options={statusOptions}
          multiple={true}
          onSelect={(items) => {
            filterContext?.setFilter('status', items);
          }}
        ></Select>
      </FormControl>
      <FormControl css={{ minWidth: '20%' }}>
        <Select
          name="Priorities"
          selected={filterContext?.filters.priority || []}
          label="Priorities"
          options={priorityOptions}
          multiple={true}
          onSelect={(items) => {
            filterContext?.setFilter('priority', items);
          }}
        ></Select>
      </FormControl>
      <FormControl css={{ minWidth: '20%' }}>
        <Select
          name="Sort"
          selected={filterContext?.filters.sortOrder || []}
          label="Sort by date end"
          options={[
            { value: 'dsc', label: 'DSC' },
            { value: 'asc', label: 'ASC' },
          ]}
          onSelect={(items) => {
            filterContext?.setFilter('sortOrder', items);
          }}
        ></Select>
      </FormControl>
    </div>
  );
}
