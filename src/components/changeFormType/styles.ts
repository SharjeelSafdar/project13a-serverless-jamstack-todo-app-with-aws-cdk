import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme =>
  createStyles({
    link: {
      marginTop: theme.spacing(2),
      fontSize: "0.8rem",
      textAlign: "right",
      marginLeft: "auto",
    },
  })
);
