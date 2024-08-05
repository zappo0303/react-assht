import UseCategory from '../../../../hook/UseCategory';
import { Box, CircularProgress, Container, Link } from '@mui/material';
import { CategoryFace } from '../../../../interfaces/Category'; 

const Category = () => {
  const { data, isLoading } = UseCategory();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box
        my={10}
        sx={{
          typography: 'body1',
          '& > :not(style) ~ :not(style)': {
            ml: 2,
          },
          '& > a': {
            textDecoration: 'none',
            color: '#808080',
            padding: '8px 30px',
            borderRadius: '20px',
            borderColor: '#808080',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'white',
            transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
            '&:hover': {
              backgroundColor: '#000',
              color: '#fff',
              borderColor: '#808080',
            },
          },
        }}
      >
        {data && data.map((item: CategoryFace, index: number) => (
         <Link key={index} href={`/category/${item._id}`}>{item.name}</Link>
        ))}
      </Box>
    </Container>
  );
};

export default Category;
