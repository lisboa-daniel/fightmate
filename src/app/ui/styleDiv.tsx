import { styled, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Square = styled(Box)<{ width?: string; height?: string }>(
  ({ theme, width = "200px", height = "200px" }) => ({
    width,
    height,
    border: "1px solid" + theme.palette.divider,
    display: "flex",
    color: "white",
    marginTop: "8px",
    borderRadius: theme.shape.borderRadius,
    padding: "12px",
  })
);

type StyledSquareProps = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  style?: SxProps;
  id? : string;

};

export default function StyleDiv({ children, width, height, style, id }: StyledSquareProps) {
  return <Square id={id} width={width} height={height} sx={style}>{children}</Square>;
}
