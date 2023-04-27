import React, { useState, useEffect } from 'react';
import FilterFields from '../components/FilterFields';
import FilterChips from '../components/FilterChips';
import LaptopTable from '../components/LaptopTable';
import LaptopDetailModal from '../components/LaptopDetailModal';
import Axios from 'axios';

// MATERIAL-UI COMPONENTS
import {
    Container,
} from '@mui/material';

const InventoryPage = () => {
    const [allLaptops, setAllLaptops] = useState([]);
    const [filteredLaptops, setFilteredLaptops] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        manufacturer: '',
        status: '',
        donatedBy: '',
        screen_size: '',
        memory: '',
        disk_size: '',
        condition: '',
        charger_included: '',
    });
    const [options, setOptions] = useState({
        manufacturer: [],
        status: [],
        donatedBy: [],
        screen_size: [],
        memory: [],
        disk_size: [],
        condition: [],
        charger_included: [],
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalLaptopData] = useState({
        serial: '',
        manufacturer: '',
        laptop_id: '',
        status: 'UNPROCESSED',
        donatedBy: '',
        date_donated: '',
        model: '',
        screen_size: '',
        cpu_type: '',
        memory: '',
        disk_size: '',
        condition: '',
        charger_type: '',
        charger_included: false,
        value: '',
        list_price: '',
        sold_price: '',
        notes: '',
    });

    useEffect(() => {
        if (!allLaptops.length) {
            Axios.get('http://localhost:3001/inventory').then((response) => {
                if (response.status == 200) {
                    console.log(response.data.response)
                    setAllLaptops(response.data.response)
                } 
                else {
                    console.error("Failed to load inventory")
                }
            });
        }
    }, [allLaptops.length])

    useEffect(() => {
        // Loop through laptops and populate options dropdowns
        const opts = { ...options };
        allLaptops.forEach(laptop => {
            if (opts.manufacturer.indexOf(laptop.manufacturer) === -1) opts.manufacturer.push(laptop.manufacturer);
            if (opts.status.indexOf(laptop.status) === -1) opts.status.push(laptop.status);
            if (opts.donatedBy.indexOf(laptop.donatedBy) === -1) opts.donatedBy.push(laptop.donatedBy);
            if (opts.screen_size.indexOf(laptop.screen_size) === -1) opts.screen_size.push(laptop.screen_size);
            if (opts.memory.indexOf(laptop.memory) === -1) opts.memory.push(laptop.memory);
            if (opts.disk_size.indexOf(laptop.disk_size) === -1) opts.disk_size.push(laptop.disk_size);
            //if (opts.laptop_condition.indexOf(laptop.laptop_condition) === -1) opts.laptop_condition.push(laptop.laptop_condition);
            //if (opts.charger_included.indexOf(laptop.charger_included) === -1) opts.charger_included.push(laptop.charger_included);
        });
        setOptions(opts);
    }, [allLaptops]);

    useEffect(() => {
        let newList = [...allLaptops];
        if (filters.search) {
            newList = newList.filter(laptop => searchCheck(laptop, filters.search.toLowerCase()));
        }
        if (filters.manufacturer) {
            newList = newList.filter(laptop => laptop.manufacturer === filters.manufacturer);
        }
        if (filters.status) {
            newList = newList.filter(laptop => laptop.status === filters.status);
        }
        if (filters.donatedBy) {
            newList = newList.filter(laptop => laptop.donatedBy === filters.donatedBy);
        }
        if (filters.screen_size) {
            newList = newList.filter(laptop => laptop.screen_size === filters.screen_size);
        }
        if (filters.memory) {
            newList = newList.filter(laptop => laptop.memory === filters.memory);
        }
        if (filters.disk_size) {
            newList = newList.filter(laptop => laptop.disk_size === filters.disk_size);
        }
        if (filters.laptop_condition) {
            newList = newList.filter(laptop => laptop.laptop_condition === filters.laptop_condition);
        }
        if (filters.charger_included) {
            if (filters.charger_included === 'Yes') {
                newList = newList.filter(laptop => laptop.charger_included);
            } else if (filters.charger_included === 'No') {
                newList = newList.filter(laptop => !laptop.charger_included);
            }
        }
        setFilteredLaptops(newList);

    }, [allLaptops, filters, filters.search]);

    function searchCheck(laptop, text) {
        if (laptop.serial?.toLowerCase().includes(text)) return true;
        if (laptop.manufacturer?.toLowerCase().includes(text)) return true;
        if (laptop.laptop_id?.toLowerCase().includes(text)) return true;
        if (laptop.status?.toLowerCase().includes(text)) return true;
        if (laptop.donatedBy?.toLowerCase().includes(text)) return true;
        if (laptop.date_donated?.toLowerCase().includes(text)) return true;
        if (laptop.model?.toLowerCase().includes(text)) return true;
        if (laptop.screen_size?.toLowerCase().includes(text)) return true;
        if (laptop.cpu_type?.toLowerCase().includes(text)) return true;
        if (laptop.memory?.toLowerCase().includes(text)) return true;
        if (laptop.disk_size?.toLowerCase().includes(text)) return true;
        if (laptop.laptop_condition?.toLowerCase().includes(text)) return true;
        if (laptop.charger_type?.toLowerCase().includes(text)) return true;
        if (laptop.notes?.toLowerCase().includes(text)) return true;
        return false;
    }

    function openModal(targetSerial) {
        setModalLaptopData(allLaptops.find(laptop => laptop.serial === targetSerial));
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setModalLaptopData({
            serial: '',
            manufacturer: '',
            laptop_id: '',
            status: 'UNPROCESSED',
            donatedBy: '',
            date_donated: '',
            model: '',
            screen_size: '',
            cpu_type: '',
            memory: '',
            disk_size: '',
            condition: '',
            charger_type: '',
            charger_included: false,
            value: '',
            list_price: '',
            sold_price: '',
            notes: '',
        });
    }

    function exportData() {
        const csvContent = [
            [
                'Serial',
                'Manufacturer',
                'Laptop ID',
                'Status',
                'Donated By',
                'Date Donated',
                'Model',
                'Screen Size',
                'CPU Type',
                'Memory',
                'Disk Size',
                'Condition',
                'Charger Type',
                'Charger Included',
                'Trade-In Value',
                'List Price',
                'Sold Price',
                'Notes',
            ],
            ...filteredLaptops.map(laptop => [
                `"${laptop.serial?.replace(`"`, `""`)}"`,
                `"${laptop.manufacturer?.replace(`"`, `""`)}"`,
                `"${laptop.laptop_id?.replace(`"`, `""`)}"`,
                `"${laptop.status?.replace(`"`, `""`)}"`,
                `"${laptop.donatedBy?.replace(`"`, `""`)}"`,
                `"${laptop.date_donated?.replace(`"`, `""`)}"`,
                `"${laptop.model?.replace(`"`, `""`)}"`,
                `"${laptop.screen_size?.replace(`"`, `""`)}"`,
                `"${laptop.cpu_type?.replace(`"`, `""`)}"`,
                `"${laptop.memory?.replace(`"`, `""`)}"`,
                `"${laptop.disk_size?.replace(`"`, `""`)}"`,
                `"${laptop.laptop_condition?.replace(`"`, `""`)}"`,
                `"${laptop.charger_type?.replace(`"`, `""`)}"`,
                `"${laptop.charger_included}"`,
                `"${laptop.value?.replace(`"`, `""`)}"`,
                `"${laptop.list_price?.replace(`"`, `""`)}"`,
                `"${laptop.sold_price?.replace(`"`, `""`)}"`,
                `"${laptop.notes?.replace(`"`, `""`)}"`,
            ])
        ]
            .map(item => item.join(","))
            .join("\n");

        let downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        downloadLink.target = '_blank';
        downloadLink.download = 'filtered_laptop_inventory.csv';
        downloadLink.click();
    }

    return <>
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 0;' }} >
            <FilterFields
                filters={filters}
                setFilters={setFilters}
                options={options}
            />
            <FilterChips
                filters={filters}
                setFilters={setFilters}
            />
            <LaptopTable
                laptops={filteredLaptops}
                filtered={allLaptops.length !== filteredLaptops.length}
                openModal={openModal}
                exportData={exportData}
            />
        </Container>

        <LaptopDetailModal
            open={modalOpen}
            close={closeModal}
            laptop={modalData}
        />
    </>;
}
export default InventoryPage;