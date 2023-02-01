import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

export const ColorButton = styled(Button)(({ theme }) => ({
  color: "#FF5858",
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
  },
}));

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
