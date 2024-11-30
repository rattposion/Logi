import React from 'react';
import { 
  DataGrid, 
  GridColDef,
  GridToolbar 
} from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  onRowClick?: (params: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ 
  rows, 
  columns, 
  loading = false,
  onRowClick 
}) => {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        onRowClick={onRowClick}
        components={{
          Toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;