import { useState } from 'react';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}));

const Image = styled('img')({
    padding: '15px',
    width: '95%'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    borderRadius: 2,
    height: 50,
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    }, 
    [theme.breakpoints.down('sm')]: {
        width: '48%'
    }  
}));

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const [quantity, setQuantity] = useState(1);
    
    const { id } = product;

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'tanus8096@gmail.com'});
        let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    return (
        <LeftContainer>
            <Box style={{ paddind: '15px 20px', border: '1px solid #f0f0f0', width: '90%' }}> 
            <Image src={product.detailUrl} /><br />
            </Box>
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{background: '#fb541b'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;