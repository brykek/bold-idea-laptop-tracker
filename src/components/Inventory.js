import FilterFields from './FilterFields';
import { Typography } from '@mui/material';


const Inventory = () => {
    return (    
        <div className='page-container'>
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Laptop Inventory</Typography>
            <FilterFields/>
        </div>
    )
   }
   export default Inventory;