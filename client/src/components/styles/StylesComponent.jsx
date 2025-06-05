import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkCompenent } from "react-router-dom";
import { gray, matblack } from "../../constants/color";
const VisuallyHiddenInput = styled("input")({
  // style properties
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

//  const Link =styled(LinkCompenent)`
//       text-decoration:none;
//       color:black;
//       padding:1rem;
//       &:hover {
//       background-color: #f0f0f0;
//       }
// `;
const Link = styled(LinkCompenent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  // border:"none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: `${gray}`,
});
// `
// width:100%;
// height:100%;
// background-color: "rgba(0,0,0,0.1)"
// `;

const SearchField = styled("input")({
  padding: "1rem 2rem",
  width: "20vmax",
  border: "none",
  outline: "none",
  borderRadius: "1.5rem",
  borderColor: `${gray}`,
  fontSize: "1.1rem",
});

const CurveButton = styled("button")({
  borderRadius: "1.5rem",
  padding: "1rem 2rem",
  border: "none",
  outline: "none",
  cursor: "pointer",
  backgroundColor: `${matblack}`,
  color: "white",
  fontSize: "1.1rem",
  "&hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});


const bounceAnimation=keyframes`
0% {transform:scale(1);}
50% {transform:scale(1.5);}
100% {transform:scale(1);}
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};
