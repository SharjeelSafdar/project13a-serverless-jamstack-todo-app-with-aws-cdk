import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 0,
    },
    addBtn: {
      marginLeft: theme.spacing(2),
    },
  })
);
