import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import banner from "src/assets/bane.png";
import dongho from "src/assets/dongho.png";
const Banner = () => {
  return (
    <>
      <Box marginTop={8}>
        <Grid container spacing={4} height={500} gap={"125px"}>
          <Grid item xs={12} md={6} style={{ position: "relative" }}>
            <Box>
              <img
                src={banner}
                alt="Banner"
                style={{
                  top: -30,
                  left: 140,
                  position: "relative",
                  zIndex: 10,
                  transform: "rotate(-35deg)",
                  width: "80%",
                }}
              />
              {/* Chấm tròn đỏ */}
              <Box
                sx={{
                  position: "absolute",
                  top: "25%",
                  left: "23%",
                  transform: "translate(-50%, -50%)",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#d44d49",
                  zIndex: 10,
                }}
              ></Box>

              {/* Chấm tròn vàng */}
              <Box
                sx={{
                  position: "absolute",
                  top: "25%",
                  left: "15%",
                  transform: "translate(-50%, -50%)",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#f8c538",
                  zIndex: 10,
                }}
              ></Box>

              {/* Chấm tròn đen */}
              <Box
                sx={{
                  position: "absolute",
                  top: "25%",
                  left: "31%",
                  transform: "translate(-50%, -50%)",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#040404",
                  zIndex: 10,
                }}
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "#06bf86",
                  borderRadius: 100,
                  width: "100%",
                  height: 350,
                  zIndex: 1,
                }}
              ></Box>
              <img
                style={{
                  position: "absolute",
                  borderRadius: "120px",
                  top: "69%",
                  right: "-1%",
                  zIndex: 10,
                }}
                src={dongho}
                alt=""
              />
            </Box>
          </Grid>
          {/* Phần thứ hai */}
          <Grid item xs={10} md={5}>
            <Box>
              <Typography
                variant="h1"
                fontWeight={600}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Nike Epic React Flywire
              </Typography>
              <Typography
                variant="h4"
                fontWeight={600}
                component="div"
                sx={{ flexGrow: 1, marginTop: 5 }}
              >
                A revolutionary syteam that adjusts to the shape of your foot
              </Typography>

              <Link to={``}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 3,
                  width: "50%",
                  height: "60px",
                  color: "white",
                  bgcolor: "black",
                  fontSize: 18,
                  borderRadius: 10,
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                Buy Now
              </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Banner;
