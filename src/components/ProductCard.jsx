/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ProductCard({ product }) {
    // console.log(product)
    const { description, image, phone_name, price} = product;
    //   console.log(image)
    return (
        <Card sx={{ maxWidth: 345 }} className='flex'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    alt="product"
                    sx={{width: '30%' , padding: "10px"}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {phone_name}
                    </Typography>
                    <Typography>
                        {price}$
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
