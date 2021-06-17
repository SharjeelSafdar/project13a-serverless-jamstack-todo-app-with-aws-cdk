import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme =>
  createStyles({
    circular: {
      color: theme.palette.common.white,
    },
  })
);
