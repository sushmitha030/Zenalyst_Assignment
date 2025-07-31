import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Pagination
} from '@mui/material';

const API_BASE_URL = 'http://localhost:8081/api/get-customer-growth-analysis';
const ITEMS_PER_PAGE = 20;

function CustomerGrowthAnalysis() {
    const [minQ4RevenueInput, setMinQ4RevenueInput] = useState(0.00);
    const [onlyPositiveGrowth, setOnlyPositiveGrowth] = useState(false);
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination states for frontend pagination
    const [currentPage, setCurrentPage] = useState(1);

    // --- Derived state for filtering and pagination (using useMemo for efficiency) ---
    const filteredData = useMemo(() => {
        let temp = rawData;

        if (!isNaN(minQ4RevenueInput) && minQ4RevenueInput > 0) {
            temp = temp.filter(customer =>
                customer['Quarter 4 Revenue'] !== null && customer['Quarter 4 Revenue'] >= minQ4RevenueInput
            );
        }

        if (onlyPositiveGrowth) {
            temp = temp.filter(customer =>
                customer['Percentage of Variance'] !== null && customer['Percentage of Variance'] > 0
            );
        }
        return temp;
    }, [rawData, minQ4RevenueInput, onlyPositiveGrowth]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    }, [filteredData]);

    const currentTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);


    const fetchData = async () => {
        setLoading(true);
        setError(null);

        // Parameters for the backend API call
        const params = {};
        if (!isNaN(minQ4RevenueInput)) {
            params.minQ4Revenue = minQ4RevenueInput;
        }
        if (onlyPositiveGrowth) {
            params.onlyPositiveGrowth = true;
        }

        try {
            const response = await axios.get(API_BASE_URL, { params });
            // Set the raw data received from the API. Filters will be applied on this.
            setRawData(response.data);
            setCurrentPage(1); // Reset to first page when new data is fetched
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response) {
                setError(`Server Error: ${err.response.status} - ${err.response.data?.message || err.response.data || err.message}`);
            } else if (err.request) {
                setError("Network Error: No response received from server. Please check your connection or server status.");
            } else {
                setError(`Request Error: ${err.message}`);
            }
            setRawData([]); // Clear data on error
            setCurrentPage(1);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data whenever minQ4RevenueInput or onlyPositiveGrowth changes
    // This replaces the manual "Refresh Data" button click
    useEffect(() => {
        fetchData();
    }, [minQ4RevenueInput, onlyPositiveGrowth]); // Dependencies ensure API call on filter change

    // Handlers for input changes
    const handleMinQ4RevenueInputChange = (event) => {
        setMinQ4RevenueInput(parseFloat(event.target.value) || 0);
        // currentPage is reset by the useEffect that calls fetchData
    };

    const handleOnlyPositiveGrowthChange = (event) => {
        setOnlyPositiveGrowth(event.target.checked);
        // currentPage is reset by the useEffect that calls fetchData
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Detailed Customer Analysis
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Min Q4 Revenue"
                    type="number"
                    value={minQ4RevenueInput}
                    onChange={handleMinQ4RevenueInputChange}
                    inputProps={{ step: "0.01" }}
                    variant="outlined"
                    size="small"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={onlyPositiveGrowth}
                            onChange={handleOnlyPositiveGrowthChange}
                            name="onlyPositiveGrowth"
                        />
                    }
                    label="Show only positive growth"
                />
                {/* The refresh button is removed as API calls are now automatic */}
                {loading && <CircularProgress size={20} color="primary" />}
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customer analysis table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quarter 3 Revenue</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quarter 4 Revenue</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Variance</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Percentage of Variance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress sx={{ my: 3 }} />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && filteredData.length === 0 && !error && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No data available with current filters.
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && currentTableData.map((row, index) => (
                            <TableRow
                                key={row['Customer Name'] || index}
                                sx={{
                                    // Apply bold style if it's the first row (index 0)
                                    fontWeight: index === 0 ? 'bold' : 'normal',
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row['Customer Name']}
                                </TableCell>
                                <TableCell align="right">
                                    {row['Quarter 3 Revenue'] !== null ? row['Quarter 3 Revenue'].toFixed(2) : 'N/A'}
                                </TableCell>
                                <TableCell align="right">
                                    {row['Quarter 4 Revenue'] !== null ? row['Quarter 4 Revenue'].toFixed(2) : 'N/A'}
                                </TableCell>
                                <TableCell align="right">
                                    {row['Variance'] !== null ? row['Variance'].toFixed(2) : 'N/A'}
                                </TableCell>
                                <TableCell align="right">
                                    {row['Percentage of Variance'] !== null ? `${row['Percentage of Variance'].toFixed(2)}%` : 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && ( // Only show pagination if there's more than 1 page
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
            {!loading && filteredData.length > 0 && (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                    Showing {currentTableData.length} of {filteredData.length} filtered records ({rawData.length} total records loaded).
                </Typography>
            )}
        </Container>
    );
}

export default CustomerGrowthAnalysis;
