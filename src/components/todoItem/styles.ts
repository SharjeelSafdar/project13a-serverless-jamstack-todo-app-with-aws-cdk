import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: theme.spacing(1),
      "&:hover": {
        boxShadow: theme.shadows[7],
      },
      "&:hover button": {
        visibility: "visible",
      },
    },
    toggleBtn: {
      marginRight: theme.spacing(1),
    },
    editBtn: {
      visibility: "hidden",
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
    deleteBtn: {
      visibility: "hidden",
    },
  })
);
