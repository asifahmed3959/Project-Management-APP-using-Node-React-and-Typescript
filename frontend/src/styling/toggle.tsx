import styled from "styled-components";
import COLORS from "./color";


const StyledLabel = styled.label<{ checked: boolean }>`
                                                     cursor: pointer;
text-indent: -9999px;
width: 125px;
height: 74px;
background: ${({ checked }) => (checked ? COLORS.GREEN :  COLORS.GRAY)};
display: inline-block;
border-radius: 75px;
position: relative;

&:after {
     content: "";
     position: absolute;
     left: ${({ checked }) => (checked ? "14px" : "calc(55% - 5px)")};    top: 12px;
width: 50px;
height: 50px;
background: #fff;
border-radius: 90px;
transition: 0.3s;
}`;

export default StyledLabel;