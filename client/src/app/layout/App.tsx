//import { useState } from 'react';
// import { Product } from '../models/product';
// import Catalog from '../../features/catalog/Catalog';
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

// const products = [
//   { name: 'product1', price: 100.0 },
//   { name: 'product2', price: 200.0 },
//   { name: 'product3', price: 300.0 },
// ];

//moved to uiSlice
// const getInitialdarkMode = () => {
//   const storeDarkMode = localStorage.getItem('darkMode');
//   return storeDarkMode ? JSON.parse(storeDarkMode) : true
// }

function App() {
  //1
  // const [products, setProducts] = useState(
  //   [
  //   { name: 'product1', price: 100.0 },
  //   { name: 'product2', price: 200.0 }
  // ]
  // )

  //2
  // const [products, setProducts] = useState<{name: string, price: number}[]>([])

  //3 using Product type array after import { Product } from '../models/product';
  // const [products, setProducts] = useState<Product[]>([]);

  // const [darkMode, setDarkMode] = useState(false);
  // const [darkMode, setDarkMode] = useState(getInitialDarkMode());

   const {darkMode} =  useAppSelector (state => state.ui);

   
  const palleteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  // const toggleDarkMode = () => {
  //   localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  //   setDarkMode(!darkMode);
  // };

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // const addProduct = () =>{
  //   setProducts([...products, { name: 'product3', price: 300.0 }])
  // }

  // const addProduct = () => {
  //   setProducts((prevState) => [
  //     ...prevState,
  //     {
  //       id: prevState.length + 1,
  //       name: 'product' + (prevState.length + 1),
  //       price: prevState.length * 100 + 100,
  //       quantityInStock: 100,
  //       description: 'test',
  //       pictureUrl: 'https://picsum.photo/200',
  //       type: 'test',
  //       brand: 'test',
  //     },
  //   ]);
  // };

  // function addProduct(){
  // }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} /> */}
      <NavBar />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          {/* <Catalog /> */}
          {/* <Catalog products={products}/> addProduct={addProduct}*/}
          {/* from react router dom */}
          <Outlet /> 
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

// function getInitialDarkMode(): any {
//   throw new Error('Function not implemented.');
// }

