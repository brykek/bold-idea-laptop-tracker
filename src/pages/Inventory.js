import FilterFields from '../components/FilterFields';
import LaptopTable from '../components/LaptopTable';
import { Typography } from '@mui/material';


const Inventory = () => {
    return (    
        <div className='page-container'>
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Laptop Inventory</Typography>
            <FilterFields/>
            <LaptopTable/>
        </div>
    )
   }
   export default Inventory;